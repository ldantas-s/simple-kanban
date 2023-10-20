export abstract class Eventing {
	private events: { [key: string]: Array<(data: any) => void> } = {};

	on<T>(eventName: string, callback: (data: T) => void): void {
		this.events[eventName] = [...(this.events[eventName] || []), callback];
	}

	trigger(eventName: string, data: unknown): void {
		const event = this.events[eventName] || [];

		if (event.length <= 0) return;

		event.forEach((callback) => callback(data));
	}
}
