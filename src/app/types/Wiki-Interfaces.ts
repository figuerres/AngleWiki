
    export interface IWiki {
        id: number;
        createdBy: number;
        createdDate: Date;
        whoChanged: number;
        lastChanged: Date;
        rowVersion: string;
        recDelete: boolean;
        title: string;
        rolesJSON: string;
    }

    export interface IPage {
        id: number;
        wikiId: number;
        parentPageId?: any;
        createdBy: number;
        createdDate: Date;
        whoChanged: number;
        lastChanged: Date;
        rowVersion: string;
        recDelete: boolean;
        title: string;
        rolesJSON?: any;
        pageContent: string;
    }


    export interface ITag {
        id: number;
        createdBy: number;
        createdDate: Date;
        whoChanged: number;
        lastChanged: Date;
        rowVersion: string;
        recDelete: boolean;
        text: string;
    }

    export interface IPageSummary {
        id: number;
        title: string;
    }
