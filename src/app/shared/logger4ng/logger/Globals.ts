

// declare var opera: { postError(arg?: any): void };
// declare var log4ts_disabled: boolean;

export class Globals{
  public  enabled: boolean =  false;
  public  useTimeStampsInMilliseconds: boolean= true;
  public  showStackTraces: boolean= false;
  public  applicationStartDate =  new Date();
  public  uniqueId: string = "log4ts_" + new Date().getTime() + "_" + Math.floor(Math.random() * 100000000);
  public  newLine: string ="\r\n";
  public  pageLoaded: boolean = false;
}