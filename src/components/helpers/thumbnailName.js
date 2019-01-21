/**
 * Gets the name of a thumbNail
 *
 * @param {object} files
 *
 * @returns {string}
 */
const getThumbnailName = files =>
  (files[0].name.length < 25
    ? files[0].name
    : `${files[0].name.substring(0, 22)}...`);
export default getThumbnailName;
