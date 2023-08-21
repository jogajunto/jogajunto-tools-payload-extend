import { GitData, ImageType } from '../types';
declare const prepareImageForRepository: (data: GitData, directoryImage: string, image: ImageType) => Promise<GitData>;
export default prepareImageForRepository;
