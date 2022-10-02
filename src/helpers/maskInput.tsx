import { ChangeEvent } from 'react'
import Schema from '../Schema.json'

export const maskInput = (event: ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value
    value = value.replace(Schema.mobilePhone.regExp, '')
    event.target.value = value
    return event
}
