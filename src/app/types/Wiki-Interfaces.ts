
    export interface IWiki {
        id: number;
        createdBy: number;
        createdDate: Date;
        whoChanged: number;
        lastChanged: Date;
        rowVersion: string;
        recDelete: boolean;
        name: string;
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
        order:number;
        name: string;
        rolesJSON?: any;
        pageContent: string;
    }

    export interface IPageEdit {
        id: number;
        wikiId: number;
        parentPageId?: any;
        name: string;
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
        name: string;
        wiki:{
          name: string;
        }
    }

    export interface IWikiName {
        id: number;
        name: string;
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
    export interface INvp {
        id: number;
        name: string;
    }
    export interface INNvp {
        id: number;
        name: string;
        linkName: string;
    }
