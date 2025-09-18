import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { View } from "@khanacademy/wonder-blocks-core"
import { sizing, border, semanticColor } from "@khanacademy/wonder-blocks-tokens"
import { PerseusDependencies, Dependencies, PerseusI18nContext } from "@khanacademy/perseus"
import ChatInterface from './components/chat/ChatInterface';
import ArticleList from './components/ArticleList';
import ArticleViewer from './components/ArticleViewer';
import { mockStrings } from '@khanacademy/perseus/strings';
import { TestMathjax } from './mathjax';

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

    TeX: TestMathjax,

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

Dependencies.setDependencies(testDependencies)

function App() {
  return (
    <Router>
      <PerseusI18nContext.Provider value={{strings: mockStrings, locale: "en"}}>
        <View style={{flexDirection: "row"}}>
          <View style={{
              margin: sizing.size_120,
              marginLeft: 0,
              padding: sizing.size_120,
              borderRightWidth: border.width.thin,
              borderRightColor: semanticColor.core.border.neutral.subtle,
              minWidth: "260px"
          }}>
              <ArticleList />
          </View>
          <View style={{
              height: '100vh',
              maxWidth: "60em",
              padding: sizing.size_120,
              gap: sizing.size_120,
              flex: 1,
              margin: '0 auto',
          }}>
              <Switch>
                <Route exact path="/" component={ChatInterface} />
                <Route path="/article/:id" component={ArticleViewer} />
              </Switch>
          </View>
        </View>
      </PerseusI18nContext.Provider>
    </Router>
  );
}

export default App;
