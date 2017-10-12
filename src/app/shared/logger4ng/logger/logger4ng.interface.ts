

// declare var opera: { postError(arg?: any): void };
// declare var log4ts_disabled: boolean;
//declare module Log4Ts {

    export interface IAppenderOptions {
        doLogName?: boolean;
    }


    export interface IAppender {
        //protected layout: Layout;
        //protected threshold: Level;
        //protected loggers: Logger[];
        name: string;
        options: IAppenderOptions;

        group(groupTitle: string, initiallyExpanded?: boolean): void;
        groupEnd(): void;
        append(logEvent: ILogEvent): void;
        doAppend(logEvent: ILogEvent): void;
        setLayout(layout: ILayout): void;
        getLayout(): ILayout;
        setThreshold(threshold: ILevel): void;
        getThreshold(): ILevel;
        setAddedToLogger(logger: ILogger): void;
        setRemovedFromLogger(logger: ILogger): void;
        toString(): string;
    }


    export interface IEventListener {
        (eventHandler: IEventSupport, eventType: string, args: any[] | any): void;
    }


    export interface IEventSupport {
        eventTypes: string[];
        listeners: { [type: string]: EventListener[] };

        setEventTypes(eventTypesParam: string[]): void;
        addEventListener(eventType: string, listener: EventListener): void;
        removeEventListener(eventType: string, listener: EventListener): void;
        dispatchEvent(eventType: string, eventArgs: any[] | any): void;
        handleError(message, exception?): void;
    }


    export interface ILevel {
        level: number;
        name: string;

        //new (level: number, name: string);

        toString(): string;
        equals(level: ILevel): boolean;
        isGreaterOrEqual(level: ILevel): boolean;
    }


    export interface ILayout {
        defaults: {
            loggerKey: string;
            timeStampKey: string;
            millisecondsKey: string;
            levelKey: string;
            messageKey: string;
            exceptionKey: string;
            urlKey: string;
        };

        loggerKey: string;
        timeStampKey: string;
        millisecondsKey: string;
        levelKey: string;
        messageKey: string;
        exceptionKey: string;
        urlKey: string;
        batchHeader: string;
        batchFooter: string;
        batchSeparator: string;
        returnsPostData: boolean;
        overrideTimeStampsSetting: boolean;
        useTimeStampsInMilliseconds: boolean;
        combineMessages: boolean;
        customFields: { name: string; value: any }[];

        format(logEvent: ILogEvent): any[] | string;
        ignoresThrowable(): boolean;
        toString(): string;
        allowBatching(): boolean;
        setTimeStampsInMilliseconds(timeStampsInMilliseconds: boolean): void;
        isTimeStampsInMilliseconds(): boolean;
        getTimeStampValue(logEvent: ILogEvent): number;
        getDataValues(logEvent: ILogEvent, combineMessages?: boolean): [string, any][];
        setKeys(loggerKey?: string, timeStampKey?: string, levelKey?: string, messageKey?: string, exceptionKey?: string, urlKey?: string, millisecondsKey?: string): void;
        setCustomField(name: string, value: any): void;
        hasCustomFields(): boolean;
        formatWithException(logEvent: ILogEvent): any[] | string
    }


    export interface ILogger {
        name: string;
        parent: ILogger;
        children: any[];
        appenders: IAppender[];
        loggerLevel: ILevel;


        trace(...msgs: any[]): void;
        debug(...msgs: any[]): void;
        info(...msgs: any[]): void;
        warn(...msgs: any[]): void;
        error(...msgs: any[]): void;
        fatal(...msgs: any[]): void;

        isEnabledFor(level: ILevel): boolean;
        isTraceEnabled(): boolean;
        isDebugEnabled(): boolean;
        isInfoEnabled(): boolean;
        isWarnEnabled(): boolean;
        isErrorEnabled(): boolean;
        isFatalEnabled(): boolean;

        addChild(childLogger: ILogger): void;

        getAdditivity(): boolean;

        setAdditivity(additivity: boolean): void;

        addAppender(appender: IAppender): void;

        removeAppender(appender: IAppender): void;

        removeAllAppenders(): void;

        getEffectiveAppenders(): IAppender[];

        invalidateAppenderCache(): void;

        log(level: ILevel, params: any[] | IArguments): void;

        callAppenders(logEvent: ILogEvent): void;

        setLevel(level: ILevel): void;

        getLevel(): ILevel;

        getEffectiveLevel(): ILevel;

        group(name: string, initiallyExpanded?: boolean): void;

        groupEnd(name?: string): void;

        timeStart(name: string, level: ILevel): void;

        timeEnd(name: string): void;

        assert(expr: boolean): void;

        toString(): string;
    }


    export interface ILogEvent {
        logger: ILogger;
        timeStamp: Date;
        level: ILevel;
        messages: any[];
        exception: any;
        milliseconds: number;
        timeStampInSeconds: number;
        timeStampInMilliseconds: number;

        getThrowableStrRep(): string;
        getCombinedMessages(): any;
        toString(): string;
    }


    export interface ILoggerOptions {
        logOriginalLoggerName?: boolean;
        logOutputLoggerName?: boolean;
    }


    export interface ITimer {
        name: string;
        level: ILevel;
        startDate: Date;
        startMillis: number;
        endDate: Date;
        endMillis: number;
        durationMillis: number;
        /** Returns elapsed time in milliseconds */
        measure(): number;
    }

//}