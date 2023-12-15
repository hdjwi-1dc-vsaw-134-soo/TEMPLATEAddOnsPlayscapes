/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

let currentPopup: any = undefined;

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('Player tags: ',WA.player.tags)

    WA.room.onEnterLayer('clockZone').subscribe(() => {
        const today = new Date();
        const time = today.getHours() + ":" + today.getMinutes();
        currentPopup = WA.ui.openPopup("clockPopup","It's " + time,[]);
    })
// custom code
WA.room.onEnterLayer("floor").subscribe(() => {
  WA.room.hideLayer("roof");
  WA.room.hideLayer("walls-bg-front");
  WA.room.hideLayer("sign");
});

WA.room.onLeaveLayer("floor").subscribe(() => {
  WA.room.showLayer("roof");
  WA.room.showLayer("walls-bg-front");
  WA.room.showLayer("facade-furniture-bg");
  WA.room.showLayer("sign");
});

WA.room.onEnterLayer("rooms_floor").subscribe(() => {
  WA.room.hideLayer("facade-furniture-fg");
  WA.room.hideLayer("facade");
  WA.room.hideLayer("facade-furniture-bg");
});

WA.room.onLeaveLayer("rooms_floor").subscribe(() => {
  WA.room.showLayer("facade-furniture-fg");
  WA.room.showLayer("facade");
  WA.room.showLayer("facade-furniture-bg");
});

//Popup Oncean campus
WA.room.onEnterLayer('message-1').subscribe(() => {
    currentPopup = WA.ui.openPopup("CampusPopup2","Campus",[]);
  })
  WA.room.onLeaveLayer('message-1').subscribe(closePopup)
  
  //Popup Oncean campus
  WA.room.onEnterLayer('message-2').subscribe(() => {
    currentPopup = WA.ui.openPopup("CampusPopup1","Campus",[]);
  })
  WA.room.onLeaveLayer('message-2').subscribe(closePopup)
  //Popup Oncean campus
  WA.room.onEnterLayer('message-3').subscribe(() => {
    currentPopup = WA.ui.openPopup("CampusPopup","Campus",[]);
  })
  WA.room.onLeaveLayer('message-3').subscribe(closePopup)

  //Popup Lake campus
  WA.room.onEnterLayer('message-lake').subscribe(() => {
    currentPopup = WA.ui.openPopup("PopupLake","Campus",[]);
  })
  WA.room.onLeaveLayer('message-lake').subscribe(closePopup)


  //Popup Park campus
WA.room.onEnterLayer('message-park-1').subscribe(() => {
  currentPopup = WA.ui.openPopup("PopupPark1","Campus",[]);
})
WA.room.onLeaveLayer('message-park-1').subscribe(closePopup)

//Popup Park campus
WA.room.onEnterLayer('message-park-2').subscribe(() => {
  currentPopup = WA.ui.openPopup("PopupPark2","Campus",[]);
})
WA.room.onLeaveLayer('message-park-2').subscribe(closePopup)


//Popup Beach campus
WA.room.onEnterLayer('message-beach').subscribe(() => {
  currentPopup = WA.ui.openPopup("PopupBeach","Campus",[]);
})
WA.room.onLeaveLayer('message-beach').subscribe(closePopup)





    WA.room.onLeaveLayer('clockZone').subscribe(closePopup)

    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

function closePopup(){
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}

export {};