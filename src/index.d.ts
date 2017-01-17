import * as React from 'react';
import * as Redux from 'redux';

/**
 * Actions
 */
interface GlobalActionsRegister {
    register(type: string): GlobalActionsRegister;
    isGlobal(action: Redux.Action): boolean;
}

export function makeGlobal(action: Redux.Action): Redux.Action;

export const GlobalActions: GlobalActionsRegister

/**
 * Reducers
 */
export function namespaced<S>(state: Redux.Reducer<S>, namespace: string): Redux.Reducer<S>;

/**
 * Components
 */

interface MapState{
    <TParentState>(state: TParentState): any;
}

interface ComponentDecorator {
    <TProps, TComponentConstruct extends (React.ComponentClass<TProps> | React.StatelessComponent<TProps>)>(component: TComponentConstruct): TComponentConstruct;
}

export function subspaced(mapState: MapState): ComponentDecorator;
export function subspaced(mapState: MapState, namespace: string): ComponentDecorator;

export interface SubspaceProviderProps {
    mapState: MapState;
    namespace?: string;
    children?: React.ReactNode;
}

export class SubspaceProvider extends React.Component<SubspaceProviderProps, void> { }