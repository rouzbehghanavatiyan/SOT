import { createAsyncThunk, createSlice, ThunkAction, ThunkDispatch, PayloadAction, AnyAction } from "@reduxjs/toolkit";
import persian_en from "react-date-object/locales/persian_en";
import persian from "react-date-object/calendars/persian";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { browserName, browserVersion } from "react-device-detect";

// interface Account {
//     userType?: SelectOption[];
//     userRole?: Role;
//     userMenu?: UserMenuItem[];
// }

const initialState: Account = {
    userType: [],
    userRole: {},
    userMenu: [],
};

// -> handle get user menu list
export const handleGetUserMenuList: ReduxToolkitType = createAsyncThunk(
    "account/handleGetUserMenuList",
    async (obj: any, { dispatch, getState }) => {
        try {
            // dispatch(RsetShowLoading(true))
            const resUserMenuList = await getUserMenuList();
            if (resUserMenuList?.data?.code === 0) {
                return resUserMenuList.data;
            } else {
                dispatch(RsetShowLoading({ value: false }));
            }
        } catch (error) {
            console.log(error);
            throw Error;
        }
    }
);

//-> handle handle Generate Keys
export const handleGenerateKeys: ReduxToolkitType = createAsyncThunk(
    "account/handleGenerateKeys",
    async (__, { dispatch, getState }: any) => {

        // dispatch(RsetShowLoading({ value: true, btnName: obj?.loadingName }))
        try {
            const res: any = await generateKeys();
            const url = window.URL.createObjectURL(
                new Blob([res?.data]),
            );
            const link: any = document.createElement('a');
            link.href = url;
            link.setAttribute(
                'download',
                `publickey.pem`,
            );
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);

            dispatch(RsetShowLoading({ value: false, btnName: "" }))
            return res.data
        } catch (error) {
            console.log(error);
            throw Error;
        }
    }
);

const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        RsetUserRole: (state, actions: PayloadAction<any>) => {
            return { ...state, userRole: actions.payload };
        },
        RsetUserType: (state, actions: PayloadAction<any>) => {
            return { ...state, userType: actions.payload };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(
                handleGetUserMenuList.fulfilled,
                (state, action: PayloadAction<any>) => {
                    try {
                        if (action.payload.code === 0) {
                            const filterMenu = action?.payload?.result?.sort(
                                (a: any, b: any) => a.priority - b.priority
                            );
                            return { ...state, userMenu: filterMenu };
                        }
                    } catch (error) {
                        console.log(error);
                        throw Error;
                    }
                }
            )
            .addCase(
                handleUpdateAccount.fulfilled,
                (state, action: PayloadAction<any>) => {
                    // if (action.payload.code === 0) {
                    // }
                    // return {}
                }
            );
    },
});

export const { RsetUserType, RsetUserRole } = accountSlice.actions;
export default accountSlice.reducer;