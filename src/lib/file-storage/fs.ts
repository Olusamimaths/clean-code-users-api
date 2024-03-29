import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import crypto from 'crypto';
import * as path from 'path';
import { Readable } from 'stream';
import { finished } from 'stream/promises';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FileStorage {
  constructor(private readonly configService: ConfigService) {}
  async saveFile(
    imageUrl: string,
  ): Promise<{ base64File: string; hash: string }> {
    const fileStoragePath = this.configService.get<string>('fs.path');
    const result = await this.downloadFileAndSave({
      url: imageUrl,
      destination: fileStoragePath,
    });
    return result;
  }

  async downloadFileAndSave(input: { url: string; destination: string }) {
    const { url, destination } = input;
    const res = await fetch(url);
    if (!fs.existsSync(destination)) await fs.promises.mkdir(destination);

    // Create a write stream with the hash
    const fileStream = fs.createWriteStream(
      path.resolve(`./${destination}`, 'tempFile'),
      { flags: 'wx' },
    );
    const hashStream = crypto.createHash('sha256');

    const chunks = [];
    fileStream.on('data', (chunk) => chunks.push(chunk));

    // Pipe the response body through the hash stream and then to the file stream
    await finished(
      Readable.from(res.body as any)
        .pipe(hashStream)
        .pipe(fileStream),
    );

    const hash = hashStream.digest('hex');

    fs.renameSync(
      path.resolve(`./${destination}`, 'tempFile'),
      path.resolve(`./${destination}`, `${hash}.jpg`),
    );

    const fileBuffer = Buffer.concat(chunks);

    const base64File = fileBuffer.toString('base64');

    return { base64File, hash };
  }

  async getFileBase64(hash: string): Promise<string> {
    const fileStoragePath = this.configService.get<string>('fs.path');
    const filePath = path.join(__dirname, fileStoragePath, `${hash}.jpg`);
    const buffer = fs.readFileSync(filePath);
    return buffer?.toString('base64');
  }
}
