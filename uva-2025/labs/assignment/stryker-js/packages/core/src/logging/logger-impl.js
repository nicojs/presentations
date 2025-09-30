import { LogLevel } from '@stryker-mutator/api/core';
import { LoggingEvent } from './logging-event.js';
export class LoggerImpl {
    #categoryName;
    #loggingBackend;
    constructor(categoryName, loggingBackend) {
        this.#categoryName = categoryName;
        this.#loggingBackend = loggingBackend;
    }
    isTraceEnabled() {
        return this.#loggingBackend.isEnabled(LogLevel.Trace);
    }
    isDebugEnabled() {
        return this.#loggingBackend.isEnabled(LogLevel.Debug);
    }
    isInfoEnabled() {
        return this.#loggingBackend.isEnabled(LogLevel.Information);
    }
    isWarnEnabled() {
        return this.#loggingBackend.isEnabled(LogLevel.Warning);
    }
    isErrorEnabled() {
        return this.#loggingBackend.isEnabled(LogLevel.Error);
    }
    isFatalEnabled() {
        return this.#loggingBackend.isEnabled(LogLevel.Fatal);
    }
    trace(message, ...args) {
        this.#loggingBackend.log(LoggingEvent.create(this.#categoryName, LogLevel.Trace, [
            message,
            ...args,
        ]));
    }
    debug(message, ...args) {
        this.#loggingBackend.log(LoggingEvent.create(this.#categoryName, LogLevel.Debug, [
            message,
            ...args,
        ]));
    }
    info(message, ...args) {
        this.#loggingBackend.log(LoggingEvent.create(this.#categoryName, LogLevel.Information, [
            message,
            ...args,
        ]));
    }
    warn(message, ...args) {
        this.#loggingBackend.log(LoggingEvent.create(this.#categoryName, LogLevel.Warning, [
            message,
            ...args,
        ]));
    }
    error(message, ...args) {
        this.#loggingBackend.log(LoggingEvent.create(this.#categoryName, LogLevel.Error, [
            message,
            ...args,
        ]));
    }
    fatal(message, ...args) {
        this.#loggingBackend.log(LoggingEvent.create(this.#categoryName, LogLevel.Fatal, [
            message,
            ...args,
        ]));
    }
}
//# sourceMappingURL=logger-impl.js.map