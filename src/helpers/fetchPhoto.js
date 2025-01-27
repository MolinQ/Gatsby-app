import FileServices from "../services/FileServices";
import { FILE_PATH } from "../constants/firebasePath";

const fileService = new FileServices();
export const fetchPhotos = async (productUid) => {
  const res = await fileService.getFilesUid(productUid);
  if (!res) return;

  const filePromises = res.map(async (fileUid) => {
    const filePath = `${FILE_PATH}/${fileUid}`;
    const imageSrc = await fileService.getFile(filePath);

    return { photoUid: fileUid, imageSrc };
  });

  return await Promise.all(filePromises);
};
