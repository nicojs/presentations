import { Injector } from 'typed-inject';
import { LoggingSink } from './logging-sink.js';
import { coreTokens } from '../di/index.js';
import { LoggingServerAddress } from './logging-server.js';
import { LogLevel } from '@stryker-mutator/api/core';
export declare function provideLogging<T extends {
    [coreTokens.loggingSink]: LoggingSink;
}>(injector: Injector<T>): any;
export declare namespace provideLogging {
    var inject: readonly ["loggingSink", any];
}
export declare function provideLoggingBackend(injector: Injector): unknown;
export declare namespace provideLoggingBackend {
    var inject: readonly [any];
}
export type LoggingProvider = ReturnType<typeof provideLogging>;
export declare function provideLoggingClient(injector: Injector, loggingServerAddress: LoggingServerAddress, activeLogLevel: LogLevel): unknown;
//# sourceMappingURL=provide-logging.d.ts.map