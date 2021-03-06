﻿// $begin{copyright}
//
// This file is confidential and proprietary.
//
// Copyright (c) IntelliFactory, 2004-2014.
//
// All rights reserved.  Reproduction or use in whole or in part is
// prohibited without the written consent of the copyright holder.
//-----------------------------------------------------------------
// $end{copyright}

namespace IntelliFactory.WebSharper.UI.Next

open IntelliFactory.WebSharper
open IntelliFactory.WebSharper.UI.Next
open IntelliFactory.WebSharper.UI.Next.Html
open IntelliFactory.WebSharper.UI.Next.Notation

// A calculator application, showing model-view separation.
// See this live at http://intellifactory.github.io/websharper.ui.next/#Calculator.fs !

[<JavaScript>]
module Calculator =

    // ============== MODEL ============== //

    type Op = Add | Sub | Mul | Div_

    // Model of our calculator
    type Calculator =
        { Memory : int ; Operand : int ; Operation : Op }

    let initCalc = { Memory = 0 ; Operand = 0 ; Operation = Add }

    // "Pushes" an int into the number we have already.
    // Mem * 10 + x
    let pushInt x rvCalc =
        Var.Update rvCalc (fun c ->
            { c with Operand = c.Operand * 10 + x})

    // Sets the current operation, shifts the current operand to memory,
    // and resets the current operand
    let shiftToMem op rvCalc =
        Var.Update rvCalc (fun c ->
            { c with Memory = c.Operand ; Operand = 0 ; Operation = op })

    // Translation functions
    let opFn op =
        match op with
        | Add -> (+)
        | Sub -> (-)
        | Mul -> (*)
        | Div_ -> (/)

    let showOp op =
        match op with
        | Add -> "+"
        | Sub -> "-"
        | Mul -> "*"
        | Div_ -> "/"

    // Calculates the answer using the selected operation, and writes the new
    // answer to the operand section. Sets memory to 0.
    let calculate rvCalc =
        Var.Update rvCalc (fun c ->
            let ans = (opFn c.Operation) c.Memory c.Operand
            { c with Memory = 0 ; Operand = ans ; Operation = Add } )

    // ============== VIEW ============== //

    // Displays the number on the calculator's screen
    let displayCalc rvCalc =
        let rviCalc = View.FromVar rvCalc
        View.Map (fun c -> string c.Operand) rviCalc

    // Button creation functions, and their associated (very simple) callbacks
    let calcBtn i rvCalc = Doc.Button (string i) [] (fun _ -> pushInt i rvCalc)
    let opBtn o rvCalc = Doc.Button (showOp o) [] (fun _ -> shiftToMem o rvCalc)
    let cBtn rvCalc = Doc.Button "C" [] (fun _ -> Var.Set rvCalc initCalc)
    let eqBtn rvCalc = Doc.Button "=" [] (fun _ -> calculate rvCalc)

    let calcView rvCalc =
        let rviCalc = View.FromVar rvCalc
        let btn i = calcBtn i rvCalc
        let obtn o = opBtn o rvCalc
        let cbtn = cBtn rvCalc
        let eqbtn = eqBtn rvCalc
        // We want something like this...
        //          [   1337]
        //           1 2 3 +
        //           4 5 6 -
        //           7 8 9 *
        //           0 C = /
        Div0 [
            Doc.TextView <| displayCalc rvCalc
            Div0 [btn 1 ; btn 2 ; btn 3 ; obtn Add]
            Div0 [btn 4 ; btn 5 ; btn 6 ; obtn Sub]
            Div0 [btn 7 ; btn 8 ; btn 9 ; obtn Mul]
            Div0 [btn 0 ; cbtn  ; eqbtn ; obtn Div_]
        ]

    // Run it!
    let Main () =
        // Create a reactive variable and view.
        Var.Create initCalc |> calcView

    let Description () =
        Div0 [
            Doc.TextNode "A calculator application"
        ]

    // You can ignore the bits here -- it just links the example into the site.
    let Sample =
        Samples.Build()
            .Id("Calculator")
            .FileName(__SOURCE_FILE__)
            .Keywords(["calculator"])
            .Render(Main)
            .RenderDescription(Description)
            .Create()
