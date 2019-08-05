// Copyright 2019 Campbell Crowley. All rights reserved.
// Author: Campbell Crowley (dev@campbellcrowley.com)

/**
 * @description Handler function for a generic action.
 * @typedef HungryGames~Action~ActionHandler
 * @type Function
 *
 * @param {HungryGames} hg HG context.
 * @param {HungryGames~GuildGame} game Game context.
 */

/**
 * @description Base for actions to perform in response to certain things that
 * happen during a hunger games.
 *
 * @memberof HungryGames
 * @inner
 * @interface
 */
class Action {
  /**
   * @description Create action.
   * @param {HungryGames~Action~ActionHandler} handler Action handler override.
   */
  constructor(handler) {
    if (typeof handler !== 'function') {
      throw new TypeError('Handler is not a function.');
    }
    this.trigger = handler;
    /**
     * @description Data injected into save file that the `create` function uses
     * to restore data. Must be serializable.
     * @type {undefined|object}
     * @private
     * @default
     */
    this._saveData = undefined;
  }

  /**
   * @description Convert this object to serializable format for saving to file.
   * Injects data from `this._saveData`.
   * @public
   * @returns {{className: string, data: ?object}} Serializable object that can
   * be saved to file.
   */
  get serializable() {
    return {className: this.constructor.name, data: this._saveData};
  }

  /**
   * @description Trigger the action to be performed.
   *
   * @type {HungryGames~Action~ActionHandler}
   * @public
   * @abstract
   * @param {HungryGames} hg HG context.
   * @param {HungryGames~GuildGame} game Game context.
   */
  trigger(hg, game) {
    hg;
    game;
    throw new Error('Trigger function not overridden.');
  }

  /**
   * @description Create action from save data.
   * @public
   * @static
   * @abstract
   * @param {external:Discord~Client} client Bot client context to get object
   * references.
   * @param {string} id Guild ID this action is for.
   * @param {object} obj The parsed data from file.
   * @returns {HungryGames~Action} The created action.
   */
  static create(client, id, obj) {
    id;
    obj;
    client;
    throw new Error('Create function not overridden.');
  }
}

module.exports = Action;

const toLoad = [
  './MemberAction.js',
  './ChannelAction.js',
  './GiveRoleAction.js',
  './TakeRoleAction.js',
  './SendMessageAction.js',
  './SendDayStartMessageAction.js',
  './SendDayEndMessageAction.js',
  './SendPlayerRankMessageAction.js',
  './SendStatusListAction.js',
  './SendTeamRankMessageAction.js',
  './SendVictorAction.js',
];
toLoad.forEach((el) => delete require.cache[require.resolve(el)]);
toLoad.forEach((el) => {
  const obj = require(el);
  Action[obj.name] = obj;
});