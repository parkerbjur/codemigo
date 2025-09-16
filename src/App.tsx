import React from 'react';
import { PerseusDependencies, PerseusDependenciesV2, Dependencies } from "@khanacademy/perseus"
import ChatInterface from './components/chat/ChatInterface';

export const testDependencies: PerseusDependencies = {
    JIPT: {
        useJIPT: false,
    },
    graphieMovablesJiptLabels: {
        addLabel: () => {},
    },
    svgImageJiptLabels: {
        addLabel: () => {},
    },
    rendererTranslationComponents: {
        addComponent: () => -1,
        removeComponentAtIndex: () => {},
    },

    TeX: ({children}: {children: React.ReactNode}) => {
        return <span className="mock-TeX">{children}</span>;
    },

    // @ts-expect-error - TS2322 - Type '(str?: string | null | undefined) => string' is not assignable to type 'StaticUrlFn'.
    staticUrl: (str?: string | null) => {
        if (str === null || str === undefined) {
            console.warn('staticUrl called with null/undefined value:', str);
            return '';
        }
        return str;
    },

    // video widget
    useVideo: (id: any, kind: any) => { // TODO: fix typing
        // Used by video-transcript-link.jsx.fixture.js
        if (id === "YoutubeId" && kind === "YOUTUBE_ID") {
            return {
                status: "success",
                data: {
                    video: {
                        id: "YoutubeVideo",
                        contentId: "contentId",
                        youtubeId: "YoutubeId",
                        title: "Youtube Video Title",
                        __typename: "Video",
                    },
                },
            };
        }
        if (id === "slug-video-id" && kind === "READABLE_ID") {
            return {
                status: "success",
                data: {
                    video: {
                        title: "Slug Video Title",
                        id: "VideoId",
                        youtubeId: "YoutubeId",
                        contentId: "contentId",
                        __typename: "Video",
                    },
                },
            };
        }

        return {
            status: "loading",
        };
    },

    InitialRequestUrl: {
        origin: "origin-test-interface",
        host: "host-test-interface",
        protocol: "protocol-test-interface",
    },

    isDevServer: false,
    kaLocale: "en",

    Log: {
      log: () => {},
      error: () => {}
    },
};

export const testDependenciesV2: PerseusDependenciesV2 = {
    analytics: {
        onAnalyticsEvent: async () => {},
    },
    useVideo: () => {
        return {
            status: "success",
            data: {
                video: null,
            },
        };
    },
};

Dependencies.setDependencies(testDependencies)

function App() {
  return (
    <ChatInterface style={{ height: '100vh', width: '100vw' }}/>
  );
}

export default App;
