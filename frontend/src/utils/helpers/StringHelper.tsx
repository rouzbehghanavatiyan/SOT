export default class StringHelpers {
  static baseURL: string | undefined = import.meta.env.VITE_SERVERPROFILE;

  static fixUserName(data: any) {
    console.log(data);
  }

  static getProfile = (data: any) => {
    console.log(StringHelpers.baseURL);

    return `${StringHelpers.baseURL}/${data?.attachmentType}/${data?.fileName}${data?.ext}`;
  };
}
