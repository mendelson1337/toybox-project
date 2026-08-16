import { AnalyticsBrowser } from '@segment/analytics-next';
import type { AnalyticsBrowser as AnalyticsBrowserType } from '@segment/analytics-next';

function opts(args) {
    return {
        timestamp: args.timestamp,
        context: args.context,
        integrations: args.integrations,
        messageId: args.messageId,
    };
}

export default {
    connection: {
        init: async ({ connection }) => {
            const writeKey = connection?.config?.frontWriteKey;
            if (!writeKey) return null;

            const [analytics] = await AnalyticsBrowser.load({ writeKey });
            return analytics;
        },
    },
    actions: {
        identify: async ({ args }, { instance }: { instance: AnalyticsBrowserType }) => {
            if (!instance) throw new Error('Segment not initialized');
            return instance.identify(args.id, args.traits, opts(args));
        },
        track: async ({ args }, { instance }: { instance: AnalyticsBrowserType }) => {
            if (!instance) throw new Error('Segment not initialized');
            return instance.track(args.event, args.properties, opts(args));
        },
        page: async ({ args }, { instance }: { instance: AnalyticsBrowserType }) => {
            if (!instance) throw new Error('Segment not initialized');
            if (!args.category) return instance.page(args.name, args.properties, opts(args));
            return instance.page(args.category, args.name, args.properties, opts(args));
        },
        group: async ({ args }, { instance }: { instance: AnalyticsBrowserType }) => {
            if (!instance) throw new Error('Segment not initialized');
            return instance.group(args.groupId, args.traits, opts(args));
        },
        alias: async ({ args }, { instance }: { instance: AnalyticsBrowserType }) => {
            if (!instance) throw new Error('Segment not initialized');
            return instance.alias(args.userId, args.previousId, opts(args));
        },
        screen: async ({ args }, { instance }: { instance: AnalyticsBrowserType }) => {
            if (!instance) throw new Error('Segment not initialized');
            if (!args.category) return instance.screen(args.name, args.properties, opts(args));
            return instance.screen(args.category, args.name, args.properties, opts(args));
        },
        reset: async (_, { instance }: { instance: AnalyticsBrowserType }) => {
            if (!instance) throw new Error('Segment not initialized');
            return instance.reset();
        },
    },
};
