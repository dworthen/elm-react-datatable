port module Main exposing (..)

import Html exposing (..)
import Html.App as App
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Table as Table
import String
import Dict exposing (Dict(..))
import Array


-- MAIN


main =
    App.program { init = init, view = view, update = update, subscriptions = subscriptions }



-- MODEL


type alias Model =
    { tableState : Table.State
    , tableConfig : Table.ViewConfig (List String) Msg
    , data : List (List String)
    }


initialViewConfig : Table.ViewConfig (List String) Msg
initialViewConfig =
    { columns = []
    , canHide = (False, "")
    , canSort = (False, "")
    , canFilter = (False, "")
    , toMsg = UpdateTableState
    }


model : Model
model =
    let
        tableState = Table.State "" Table.Asc [] []
    in
        Model tableState initialViewConfig []


init : ( Model, Cmd Msg )
init =
    ( model, Cmd.none )


getListItem : Int -> List String -> String
getListItem ind items =
    items
        |> Array.fromList
        |> Array.get ind
        |> Maybe.withDefault ""



-- UPDATE


type alias SimpleState = 
    { sortBy : String
    , sortOrder : String
    , filters : List (String, String)
    , hiddenColumns : List String
    }


sortOrderToString : Table.SortOrder -> String
sortOrderToString sort =
    case sort of
        Table.Asc -> "Asc"
        Table.Desc -> "Desc"


stringToSortOrder : String -> Table.SortOrder
stringToSortOrder order =
    if order == "Desc" then
        Table.Desc
    else
        Table.Asc


toSimpleState : Table.State -> SimpleState
toSimpleState {sortBy, sortOrder, filters, hiddenColumns} =
    let
        newOrder = sortOrderToString sortOrder
    in
        SimpleState sortBy newOrder filters hiddenColumns


toState : SimpleState -> Table.State
toState {sortBy, sortOrder, filters, hiddenColumns} =
    let
        newOrder = stringToSortOrder sortOrder
    in
        Table.State sortBy newOrder filters hiddenColumns


updateColumns : Table.ViewConfig (List String) Msg -> List String -> Table.ViewConfig (List String) Msg
updateColumns viewConfig columns =
    let
        newColumns =
            columns
                |> List.indexedMap (\i c -> Table.stringColumn c (getListItem i) Nothing)
    in
        { viewConfig | columns = newColumns }


-- PORTS

port updateTableState : SimpleState -> Cmd msg


type Msg
    = UpdateTableState Table.State
    | NewTableState SimpleState
    | NewColumns (List String)
    | NewData (List (List String))
    | CanHide (Bool, String)
    | CanSort (Bool, String)
    | CanFilter (Bool, String)
    | SomethingElse


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of 
        UpdateTableState newTableState ->
            ( model, updateTableState (toSimpleState newTableState) )

        NewTableState simpleState ->
            let
                newTableState = toState simpleState
            in
                ( { model | tableState = newTableState }, Cmd.none )

        NewColumns cols ->
            let
                newTableConfig = updateColumns model.tableConfig cols
            in
                ( { model | tableConfig = newTableConfig }, Cmd.none )

        NewData newData ->
            ( { model | data = newData}, Cmd.none )

        CanHide newCanHide ->
            let
                { tableConfig } = model
                newTableConfig = { tableConfig | canHide = newCanHide }
            in
                ( { model | tableConfig = newTableConfig }, Cmd.none )

        CanSort newCanSort ->
            let
                { tableConfig } = model
                newTableConfig = { tableConfig | canSort = newCanSort }
            in
                ( { model | tableConfig = newTableConfig }, Cmd.none )

        CanFilter newCanFilter ->
            let
                { tableConfig } = model
                newTableConfig = { tableConfig | canFilter = newCanFilter }
            in
                ( { model | tableConfig = newTableConfig }, Cmd.none )
              
        _ ->
            ( model, Cmd.none )



-- SUBSCRIPTIONS


port tableState : (SimpleState -> msg) -> Sub msg 
port columns : (List String -> msg) -> Sub msg
port data : (List (List String) -> msg) -> Sub msg
port canHide : ((Bool, String) -> msg) -> Sub msg
port canSort : ((Bool, String) -> msg) -> Sub msg
port canFilter : ((Bool, String) -> msg) -> Sub msg


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.batch 
        [ tableState NewTableState
        , columns NewColumns
        , data NewData
        , canHide CanHide
        , canSort CanSort
        , canFilter CanFilter
        ]
    


-- VIEW


view : Model -> Html Msg
view model =
    div []
        [ Table.view model.tableConfig model.tableState model.data
        ]


