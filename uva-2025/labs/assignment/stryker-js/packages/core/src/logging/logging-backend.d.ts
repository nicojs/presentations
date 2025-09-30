import { LogLevel, PartialStrykerOptions } from '@stryker-mutator/api/core';
import { LoggingEvent } from './logging-event.js';
import { Disposable } from 'typed-inject';
import { LoggingSink } from './logging-sink.js';
/**
 * The logging backend that handles the actual logging. So to both a file and the stdout.
 */
export declare class LoggingBackend implements LoggingSink, Disposable {
    #private;
    activeStdoutLevel: LogLevel;
    activeFileLevel: LogLevel;
    showColors: boolean;
    log(event: LoggingEvent): void;
    isEnabled(level: LogLevel): boolean;
    get activeLogLevel(): LogLevel;
    get priority(): any;
    configure({ logLevel, fileLogLevel, allowConsoleColors, }: PartialStrykerOptions): void;
    dispose(): any;
}
//# sourceMappingURL=logging-backend.d.ts.map