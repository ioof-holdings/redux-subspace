import * as React from 'react';
import * as Redux from 'redux';

/**
 * Actions
 */
interface GlobalActionsRegister {
    register(type: string): GlobalActionsRegister;
    isGlobal(action: Redux.Action): boolean;
}

export function asGlobal(action: Redux.Action): Redux.Action ;

export const GlobalActions: GlobalActionsRegister

/**
 * Reducers
 */
export function namespaced<S>(state: Redux.Reducer<S>, namespace: string): Redux.Reducer<S>;

/**
 * Components
 */

interface MapState<TParentState, TRootState>{
    (state: TParentState, rootState?: TRootState): any;
}

interface ComponentDecorator {
    <TProps, TComponentConstruct extends (React.ComponentClass<TProps> | React.StatelessComponent<TProps>)>(component: TComponentConstruct): TComponentConstruct;
}

export function subspaced<TParentState, TRootState>(mapState: MapState<TParentState, TRootState>, namespace?: string): ComponentDecorator;

export interface SubspaceProviderProps<TParentState, TRootState> {
    mapState: MapState<TParentState, TRootState>;
    namespace?: string;
    children?: React.ReactNode;
}

export class SubspaceProvider<TParentState, TRootState> extends React.Component<SubspaceProviderProps<TParentState, TRootState>> { }