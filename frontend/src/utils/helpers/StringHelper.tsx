export default class StringHelpers {
  static baseURL: string | undefined = import.meta.env.VITE_SERVERPROFILE;

  static getProfile = (data: any) => {
    const url = `${StringHelpers.baseURL}/${data?.attachmentType}/${data?.fileName}${data?.ext}`;
    console.log(url);

    return url;
  };
}
