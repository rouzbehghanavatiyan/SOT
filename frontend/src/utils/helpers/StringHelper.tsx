export default class StringHelpers {
  static baseURL: string | undefined = import.meta.env.VITE_SERVERPROFILE;
 
  static getProfile = (data: any) => { 
    return `${StringHelpers.baseURL}/${data?.attachmentType}/${data?.fileName}${data?.ext}`;
  };
}
