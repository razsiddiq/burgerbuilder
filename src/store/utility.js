export const updateObeject = (oldObject, updatedProperties) =>{
    return {
        ...oldObject,
        ...updatedProperties
    }
}

