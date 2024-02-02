export const emailRegex =/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/

export const phoneRegex = /^[0-9]\d{9}$/;

export const ukphoneRegex =/^\(?0( *\d\)?){9,10}$/

export const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

export const nameRegex = /^[a-zA-Z ]*$/

export const aadharRegex = /(^[0-9]{4}[0-9]{4}[0-9]{4}$)|(^[0-9]{4}\s[0-9]{4}\s[0-9]{4}$)|(^[0-9]{4}-[0-9]{4}-[0-9]{4}$)/;

export const panRegex = /(^([A-Z]{5})([0-9]{4})([A-Z]{1})$)/;

export const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;

export const NumberRegex = /^(?:-(?:[1-9](?:\d{0,2}(?:,\d{3})+|\d*))|(?:0|(?:[1-9](?:\d{0,2}(?:,\d{3})+|\d*))))(?:.\d+|)$/

export const MinRegex = /^[a-zA-Z0-9-]*[a-zA-Z0-9]{3,}$/;

export const MaxRegex =/^[a-zA-Z]{3,10}$/;

export const AlphaNumeric = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/;