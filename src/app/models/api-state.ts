// The following is inspired by https://blog.angularindepth.com/handle-api-call-state-nicely-445ab37cc9f8

export interface ApiCallState {
    loading: boolean
    success: string
    error: string
}

export class DefaultApiCallState implements ApiCallState{
    loading = false
    success = null
    error = null
}

export class LoadingApiCallState implements ApiCallState{
    loading = true
    success = null
    error = null
}

export class SuccessApiCallState implements ApiCallState{
    loading = false
    success = ""
    error = null
    constructor(success: string) {
        this.success = success
    }
}

export class ErrorApiCallState implements ApiCallState{
    loading = false
    success = null
    error = null
    constructor(error: string) {
        this.error = error
    }
}