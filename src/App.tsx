import React from 'react';
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';
import { View } from "@khanacademy/wonder-blocks-core"
import { Spring } from "@khanacademy/wonder-blocks-layout"
import { sizing, border, semanticColor } from "@khanacademy/wonder-blocks-tokens"
import { PerseusDependencies, Dependencies, PerseusI18nContext } from "@khanacademy/perseus"
import ChatInterface from './components/chat/ChatInterface';
import ArticleList from './components/ArticleList';
import ArticleViewer from './components/ArticleViewer';
import ArticleCreator from './components/ArticleCreator';
import { mockStrings } from '@khanacademy/perseus/strings';
import { MathInputI18nContext } from "@khanacademy/math-input"
import { TestMathjax } from './mathjax';
import { mockStrings as mathMockStrings } from '@khanacademy/math-input/strings';
import Button from '@khanacademy/wonder-blocks-button';
import filePlus from "@phosphor-icons/core/regular/file-plus.svg";

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
    const history = useHistory()
    return (
        <PerseusI18nContext.Provider value={{ strings: mockStrings, locale: "en" }}>
            <MathInputI18nContext.Provider value={{ strings: mathMockStrings, locale: "en" }}>
                <View style={{ flexDirection: "row", height: '100vh' }}>
                    <View style={{
                        padding: sizing.size_120,
                        gap: sizing.size_120,
                        borderRightWidth: border.width.thin,
                        borderRightColor: semanticColor.core.border.neutral.subtle,
                        minWidth: "260px"
                    }}>
                        <ArticleList />
                        <Spring/>
                        <Button
                            startIcon={filePlus}
                            onClick={() => { history.push("/create") }}
                        >
                            New article
                        </Button>
                    </View>
                    <View style={{
                        background: semanticColor.core.background.base.subtle,
                        flex: 1,
                        overflow: 'scroll',
                        overflowX: 'hidden',
                    }}>
                        <View style={{
                            height: '100vh',
                            maxWidth: '60em',
                            width: "100%",
                            padding: `${sizing.size_120}`,
                            gap: sizing.size_120,
                            margin: '0 auto',
                        }}>
                            <Switch>
                                <Route exact path="/create" component={ArticleCreator} />
                                <Route path="/article/:id" component={ArticleViewer} />
                            </Switch>
                        </View>
                    </View>
                </View>
            </MathInputI18nContext.Provider>
        </PerseusI18nContext.Provider>
    );
}

export default App;
