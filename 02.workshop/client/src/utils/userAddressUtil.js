export const getAddressString = (address) => {
    return `${address.country}, ${address.city}, ${address.street} ${address.streetNumber}`;
}