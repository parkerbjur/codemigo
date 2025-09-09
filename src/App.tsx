import React from 'react';
import { ArticleRenderer, PerseusDependencies, PerseusDependenciesV2, Dependencies, PerseusI18nContext } from "@khanacademy/perseus"
import { PerseusRenderer } from '@khanacademy/perseus-core'
import { mockStrings } from '@khanacademy/perseus/strings';

const sampleArticle: PerseusRenderer = {
  "content": "[[☃ image 2]]\n\n**Part A:** Return to the main characters from your three favorite films. \n\n- What was one important choice they had to make where the stakes were **high**?\n\n-  What were the **stakes**?\n\n- Can you identify them as internal, external or philosophical?\n\n**Part B:** Think about a difficult choice you had to make in your own life.  What was at stake? \n\n**Part C:** Return to one of the obstacles your character might face from the previous exercise. Now think of the **choice** this obstacle forces them to make. Answer the following:\n\n- What are the possible stakes of this choice?\n\n- Can you come up with an internal, external or philosophical stake which applies to this choice? \n",
  "images": {},
  "widgets": {
    "image 2": {
      "type": "image",
      "alignment": "block",
      "static": false,
      "graded": true,
      "options": {
        "static": false,
        "title": "",
        "range": [
          [
            0,
            10
          ],
          [
            0,
            10
          ]
        ],
        "box": [
          1258,
          703
        ],
        "backgroundImage": {
          "url": "https://ka-perseus-images.s3.amazonaws.com/b08029bc1786fbe54468a2ddc96aaa20be7a663a.png",
          "width": 1258,
          "height": 703
        },
        "labels": [],
        "alt": "A scene from Pixar's film \"Toy Story 3\" where the characters are swimming in a sea of trash and look very afraid.",
        "caption": "A scene from Pixar's film \"Toy Story 3\" where the characters are swimming in a sea of trash and look very afraid.\""
      },
      "version": {
        "major": 0,
        "minor": 0
      }
    }
  }
}

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
    <div className="App">
        <PerseusI18nContext.Provider value={{strings: mockStrings, locale: "en"}}>
            <ArticleRenderer json={sampleArticle} dependencies={testDependenciesV2}></ArticleRenderer>
        </PerseusI18nContext.Provider>
    </div>
  );
}

export default App;
