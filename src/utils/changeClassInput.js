/* eslint-disable no-param-reassign */
export default function changeClassInput(error, input, name) {
  if (error[name]) {
    input.className += ' profile__input-invalid';
  } else input.className = 'profile__form-input';
}
