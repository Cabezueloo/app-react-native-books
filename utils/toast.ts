import Toast from "react-native-toast-message"

export const toastSuccess = (msg:string) => {
    Toast.show({
        type:'success',
        text1: msg
    })
}


export const toastError = (msg:string) => {
    Toast.show({
        type:'error',
        text1: msg
    })
}

export const toastInfo = (msg:string) => {
    Toast.show({
        type:'info',
        text1: msg
    })
}