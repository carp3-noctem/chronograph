const Homey = require('homey');
const Transition = require('../transition.js');

class TransitionStopped extends Homey.FlowCardTrigger {
	constructor(triggerId) {
		super(triggerId);

		this.register();
		this.registerRunListener((args, state) => {
			return Promise.resolve(Transition.generateId(args.name) == state.transitionId);
		});

		// Listen for transition stopped events that should trigger this card.
		Transition.events.on('stopped', (transition) => {
			this.trigger({
				// Tokens.
				"name": transition.getName(),
				"seconds": Math.round(transition.getDuration() / 1e1) / 1e2
			}, {
				// State.
				"transitionId": transition.getId()
			}, () => {
				// Callback.
			});
		});
	}
}

module.exports = TransitionStopped;