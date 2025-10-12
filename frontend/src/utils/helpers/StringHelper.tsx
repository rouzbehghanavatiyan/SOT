export default class StringHelpers {
  static baseURL: string | undefined = import.meta.env.VITE_SERVERTEST;

  static fixUserName(data: any) {
    console.log(data);
  }

  static getProfile = (data: any) => { 
    return `${StringHelpers.baseURL}/${data?.attachmentType}/${data?.fileName}${data?.ext}`;
  };
}
