const _ = require('underscore');

class Router {

    commands = {};

    constructor() {}

    on(command, fn) {
        this.commands[command] = fn;
    }

    middleware(ctx, next) {

        if(!ctx.message) return next();

        let str = ctx.message.text;

        if(!str.startsWith('/')) return next();

        let cmd = str.split(' ')[0];
        let arg = str.split(' ').slice(1).join(' ');

        if(_.isFunction(this.commands[cmd])) {
            this.commands[cmd](ctx, arg, arg.split(' '))
        } else {
            return next();
        }

        return next();

    }

}

module.exports = Router;