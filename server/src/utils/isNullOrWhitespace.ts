export default function isNullOrWhitespace(str: string) {

    if (typeof str === 'undefined' || str == null) return true;

    return str.replace(/\s/g, '').length < 1;
}