import * as path from "path";
import { diskStorage } from "multer";
import * as mime from "mime"
import { v4 as uuidv4 } from "uuid";

export function storageDir() {
    return path.join(__dirname, '../../uploads');
}

export function multerStorage(dist: string) {
    return {
        destination: (req: any, file: any, cb: any) => {
            cb(null, dist);
        },
        filename: (req: any, file: any, cb: any) => {
            cb(null, `${uuidv4()}.${mime.getExtension(file.mimetype)}`);
        }
    }
}