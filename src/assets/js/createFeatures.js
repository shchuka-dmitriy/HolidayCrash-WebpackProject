'use strict';
import '../sass/style.scss';

async function loadFeatures(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        appendFeaturesToList(data);
    } catch (e) {
        console.error(e);
    }
}

loadFeatures('./data/features.json');

// fetch('./data/features.json')
//     .then(response => response.json())
//     .then( appendFeaturesToList )
//     .catch(console.error);

function appendFeaturesToList (features) {
    const featuresListElem = document.getElementById('rowFeaturesContainer');

    features.forEach(
        feature => {
            featuresListElem.appendChild( createFeatureCardElem(feature) )
        }
    )
}

function createFeatureCardElem(feature) {
    const featureListItem = createFeatureListItemElem(feature);
    featureListItem.appendChild( createFeatureImageElem(feature));
    featureListItem.appendChild( createFeatureContentElem(feature));
    return featureListItem;
}

function createFeatureListItemElem(feature) {
    const featureListItem = document.createElement( 'div' );
    featureListItem.setAttribute( 'id', feature.id);
    featureListItem.classList.add('featureCard');
    return featureListItem;
}

function createFeatureImageElem({featurePicture}) {
    const featureImage = document.createElement('img');
    featureImage.setAttribute('src', `${featurePicture}`);
    featureImage.setAttribute('alt', 'icon');
    const featureImageContainer = document.createElement('div');
    featureImageContainer.appendChild(featureImage);
    return  featureImageContainer;
}

function createFeatureContentElem(feature) {
    const featureContentElem = document.createElement('div');
    featureContentElem.classList.add('featureContent');
    featureContentElem.appendChild(createFeatureNameElem(feature));
    featureContentElem.appendChild(createFeatureDescriptionElem(feature));
    return featureContentElem;
}

function createFeatureNameElem(feature) {
    const featureNameElem = document.createElement('h5');
    featureNameElem.classList.add('featureName');
    featureNameElem.innerText = feature.name;
    return featureNameElem;
}

function createFeatureDescriptionElem({text}) {
    const featureDescriptionElem = document.createElement('p');
    featureDescriptionElem.classList.add('featureDescription');
    featureDescriptionElem.innerText = `${text}`;
    return featureDescriptionElem;
}