import * as path from "path";
import { diskStorage } from "multer";
import * as mime from "mime"
import { v4 as uuid } from "uuid";

export function storageDir() {
    return path.join(__dirname, '../../uploads');
}

export function multerStorage(dest: string) {
    return diskStorage(
        {
            destination: (req: any, file: any, cb: any) => {
                cb(null, dest);
            },
            filename: (req: any, file: any, cb: any) => {
                cb(null, `${uuid()}.${(mime as any).extensions[file.mimetype]}`);
            }
        }
    )
}