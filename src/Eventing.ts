export abstract class Eventing {
	private events: { [key: string]: Array<() => void> } = {};

	on(eventName: string, callback: () => void): void {
		this.events[eventName] = [...(this.events[eventName] || []), callback];
	}

	trigger(eventName: string): void {
		const event = this.events[eventName] || [];

		if (event.length <= 0) return;

		event.forEach((callback) => callback());
	}
}
