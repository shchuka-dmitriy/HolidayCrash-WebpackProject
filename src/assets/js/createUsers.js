'use strict';
import '../sass/style.scss';

async function loadUsers(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        appendUsersToList(data);
    } catch (e) {
        console.error(e);
    }
}

loadUsers('./data/employees.json');


// fetch('./data/employees.json')
//     .then(response => response.json())
//     .then( appendUsersToList )
//     .catch(console.error);

function appendUsersToList (users) {
    const usersListElem = document.getElementById('rowUsersContainer');
    users.forEach(
        user => {
            usersListElem.appendChild( createUserCardElem(user) )
        }
    )
}

function createUserCardElem(user) {
    const userListItem = createUserListItemElem(user);
    userListItem.appendChild( createUserImageElem(user) );
    userListItem.appendChild( createUserContentElem(user) );
    userListItem.appendChild( createUserContactsContainer(user) );
    return userListItem;
}

function createUserListItemElem(user) {
    const userListItem = document.createElement( 'div' );
    userListItem.setAttribute( 'id', user.id);
    userListItem.classList.add('userCard');
    return userListItem;
}

function createUserImageElem({profilePicture}) {
    const userImage = document.createElement('img');
    userImage.setAttribute('src', `${profilePicture}`);
    userImage.setAttribute('alt', 'photo');
    const userImageContainer = document.createElement('div');
    userImageContainer.appendChild(userImage);
    return  userImageContainer;
}

function createUserContentElem(user) {
    const userContentElem = document.createElement('div');
    userContentElem.classList.add('userContent');
    userContentElem.appendChild(createUserNameElem(user));
    userContentElem.appendChild(createUserDescriptionElem(user));
    return userContentElem;
}

function createUserNameElem(user) {
    const userNameElem = document.createElement('h4');
    userNameElem.classList.add('userName');
    userNameElem.innerText = user.name;
    return userNameElem;
}

function createUserDescriptionElem({resume}) {
    const userDescriptionElem = document.createElement('p');
    userDescriptionElem.classList.add('userDescription');
    userDescriptionElem.innerText = `${resume}`;
    return userDescriptionElem;
}

function createUserContactsContainer(user) {
    const userContactsContainerElem = document.createElement("div");

    userContactsContainerElem.classList.add("userContactsContainer");
    userContactsContainerElem.append( createUserContactsElem(user) );

    return userContactsContainerElem;
}

function createUserContactsElem(user) {
    const userContactsElem = document.createElement("a");
    userContactsElem.classList.add('contacts');
    userContactsElem.setAttribute('href', '#');
    userContactsElem.append( createUserContactsImgFacebookElem() );
    userContactsElem.append( createUserContactsImgTwitterElem() );
    userContactsElem.append( createUserContactsImgSkypeElem() );
    userContactsElem.append( createUserContactsImgGoogleElem() );
    userContactsElem.append( createUserContactsImgDribbleElem());
    return userContactsElem;
}

function createUserContactsImgFacebookElem() {
    const userContactsImgElem = document.createElement("i");
    userContactsImgElem.classList.add('fab');
    userContactsImgElem.classList.add('fa-facebook');
    return userContactsImgElem;
}

function createUserContactsImgTwitterElem() {
    const userContactsImgElem = document.createElement("i");
    userContactsImgElem.classList.add('fab');
    userContactsImgElem.classList.add('fa-twitter');
    return userContactsImgElem;
}

function createUserContactsImgSkypeElem() {
    const userContactsImgElem = document.createElement("i");
    userContactsImgElem.classList.add('fab');
    userContactsImgElem.classList.add('fa-linkedin');
    return userContactsImgElem;
}

function createUserContactsImgGoogleElem() {
    const userContactsImgElem = document.createElement("i");
    userContactsImgElem.classList.add('fab');
    userContactsImgElem.classList.add('fa-google-plus');
    return userContactsImgElem;
}

function createUserContactsImgDribbleElem() {
    const userContactsImgElem = document.createElement("i");
    userContactsImgElem.classList.add('fab');
    userContactsImgElem.classList.add('fa-dribbble');
    return userContactsImgElem;
}