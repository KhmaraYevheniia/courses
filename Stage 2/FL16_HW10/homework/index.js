class Magazine {
    constructor() {
        this.states = {
            ReadyForPushNotificationState: 'ReadyForPushNotification',
            ReadyForApproveState: 'ReadyForApprove',
            ReadyForPublishState: 'ReadyForPublish',
            PublishInProgressState: 'PublishInProgress'
        }
        this.followers = {};
        this.currentState = this.states.ReadyForPushNotificationState;
        this.staffMap = new Map();
        this.articlesList = [];
        this.timer;
    }

    addArticle(article, type) {

        this.articlesList.push({type, article});

        if (this.articlesList.length === 5) {
            this.currentState = this.states.ReadyForApproveState;
        }
    }

    addStaff(name, type) {

        const staffList = this.staffMap.has(type) ? this.staffMap.get(type) : [];
        staffList.push(name);
        this.staffMap.set(type, staffList);

    }

    approve(name) {

        switch (this.currentState) {
            case this.states.ReadyForPushNotificationState:
                return console.log(`Hello ${name}. You can't approve. We don't have enoughof publications.`);
            case this.states.ReadyForPublishState: 
                return console.log(`Hello ${name} Publications have been already approved by you.`);
            case this.states.PublishInProgressState: 
                return console.log(`Hello ${name}. While we are publishing we can't do any actions`)
            default:
                this.currentState = this.states.ReadyForPublishState;
                return console.log(`Hello ${name} You've approved the changes`);
        }
    }

    publish(name) {

        switch (this.currentState) {
            case this.states.ReadyForPushNotificationState:
                return console.log(`Hello ${name}. You can't publish. We are creating publications now.`);
            case this.states.ReadyForApproveState: 
                return console.log(`Hello ${name}. You can't publish. We don't have a manager's approval.`);
            case this.states.PublishInProgressState: 
            return console.log(`Hello ${name}. While we are publishing we can't do any actions.`);
            default:
                this.currentState = this.states.PublishInProgressState;
                console.log(`Hello ${name}. You've recently published publications.`);

                this.timer = setInterval(() => {
                    this.articlesList = [];
                    clearInterval(this.timer);
                    this.currentState = this.states.ReadyForPushNotificationState;
                }, 60000)
        
                this.articlesList.forEach((articleData) => {
                    this.notify(articleData);
                })
                break;
        }
    }

    notify(articleData) {

        if (!Array.isArray(this.followers[articleData.type])) {
          return;
        }
    
        this.followers[articleData.type].forEach((name) => {
          console.log(`${articleData.article} ${name}`)
        })
    }

    subscribe(type, name) {

        if (!Array.isArray(this.followers[type])) {
          this.followers[type] = []
        }

        this.followers[type].push(name);
    }

    unsubscribe(type, name) {
        this.followers[type] = this.followers[type].filter((follower) => follower !== name);
    }
}

class MagazineEmployee {

    constructor(name, type, magazine) {
        this.name = name;
        this.type = type;
        this.magazine = magazine;
        this.magazine.addStaff(name, type)
    }

    addArticle(article) {
        this.magazine.addArticle(article, this.type);
    }

    approve() {
        if (this.type === 'manager') {
            this.magazine.approve(this.name);
        } else {
            console.log('you do not have permissions to do it');
        }
    }

    publish() {
        this.magazine.publish(this.name)
    }
}

class Follower {
    constructor(name) {
        this.name = name;
    }

    subscribeTo(magazine, type) {
        return magazine.subscribe(type, this.name);
    }

    unsubscribe(magazine, type) {
        return magazine.unsubscribe(type, this.name)
    }
}
