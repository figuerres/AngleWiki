
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

    export interface IPageEdit {
        id: number;
        wikiId: number;
        parentPageId?: any;
        title: string;
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
        wikiId:number;
        id: number;
        title: string;
        wiki:{
          title: string;
        }
    }

    export interface IWikiName {
        id: number;
        title: string;
    }

    export interface IWikiToc {
        id: number;
        order: number;
        name: string;
        children: IWikiToc[];
    }

    export interface IWikiFile {
        id: number;
        fileName: string;
        mimeType: string;
        createdDate: Date;
    }