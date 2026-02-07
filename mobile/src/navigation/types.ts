/**
 * Navigation Type Definitions
 * TypeScript types for type-safe navigation
 */

import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  Auth: undefined;
  Main: NavigatorScreenParams<TabParamList>;
};

export type TabParamList = {
  Home: undefined;
  Cinema: NavigatorScreenParams<CinemaStackParamList>;
  Shorts: undefined;
  Growth: undefined;
  Account: undefined;
};

export type CinemaStackParamList = {
  CinemaMode: undefined;
  CinemaSimple: undefined;
  CinemaPro: undefined;
  ProductionDetail: { productionId: string };
};
