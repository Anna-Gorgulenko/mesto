export default class UserInfo {
   constructor({nameSelector, jobSelector, avatarSelector}) {
      this._nameElement = document.querySelector(nameSelector);
      this._jobElement = document.querySelector(jobSelector);
      this._avatar = document.querySelector(avatarSelector);
   }

   getUserInfo = () => {
      return {
         name: this._nameElement.textContent,
         job: this._jobElement.textContent
      }
   }

   setUserInfo = ({name, job}) => {
      this._nameElement.textContent = name;
      this._jobElement.textContent = job;
   }

   setAvatar = (avatarUrl) => {
      this._avatar.src = avatarUrl;
   }
}