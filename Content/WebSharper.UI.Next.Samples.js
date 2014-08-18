// $begin{copyright}
//
// This file is part of WebSharper
//
// Copyright (c) 2008-2013 IntelliFactory
//
// GNU Affero General Public License Usage
// WebSharper is free software: you can redistribute it and/or modify it under
// the terms of the GNU Affero General Public License, version 3, as published
// by the Free Software Foundation.
//
// WebSharper is distributed in the hope that it will be useful, but WITHOUT
// ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
// FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License
// for more details at <http://www.gnu.org/licenses/>.
//
// If you are unsure which license is appropriate for your use, please contact
// IntelliFactory at http://intellifactory.com/contact.
//
// $end{copyright}

try {
    Object.defineProperty(Error.prototype, 'message', { enumerable: true });
} catch (e) { }

var IntelliFactory =
{
    Runtime:
    {

        Class:
            function (p, s) {
                function r() { }
                r.prototype = p;
                for (var f in s) { r[f] = s[f]; }
                return r;
            },

        Define:
            function (a, b) {
                function define(a, b) {
                    for (var k in b) {
                        var t1 = typeof a[k];
                        var t2 = typeof b[k];
                        if (t1 == "undefined") {
                            a[k] = b[k];
                        } else if (t1 == "object" && t2 == "object") {
                            define(a[k], b[k]);
                        } else {
                            throw new Error("Name conflict: " + k);
                        }
                    }
                }
                define(a, b);
            },

        Field:
            function (f) {
                var value, ready = false;
                return function () {
                    if (!ready) { ready = true; value = f(); }
                    return value;
                }
            },

        For:
            function (lowerBound, upperBound, body) {
                for (var i = lowerBound; i <= upperBound; i++) {
                    body(i);
                }
            },

        ForEach:
            function (obj, body) {
                for (var f in obj) {
                    body(f);
                }
            },

        New:
            function (ctor, fields) {
                var r = new ctor();
                for (var f in fields) {
                    if (!(f in r)) {
                        r[f] = fields[f];
                    }
                }
                return r
            },

        OnInit:
            function (f) {
                if (!("init" in this)) {
                    this.init = [];
                }
                this.init.push(f);
            },

        OnLoad:
            function (f) {
                if (!("load" in this)) {
                    this.load = [];
                }
                this.load.push(f);
            },

        Inherit:
            function (a, b) {
                var p = a.prototype;
                a.prototype = new b();
                for (var f in p) {
                    a.prototype[f] = p[f];
                }
            },

        Safe:
            function (x) {
                if (x === undefined) return {};
                return x;
            },

        Start:
            function () {
                function run(c) {
                    for (var i = 0; i < c.length; i++) {
                        c[i]();
                    }
                }
                if ("init" in this) {
                    run(this.init);
                    this.init = [];
                }
                if ("load" in this) {
                    run(this.load);
                    this.load = [];
                }
            },

        Throw:
            function (e) {
                throw e;
            },

        Tupled:
            function (f) {
                return function (x) {
                    if (arguments.length > 1) {
                        return f(arguments);
                    } else {
                        return f(x);
                    }
                }
            },

        Try:
            function (block, handler) {
                try {
                    return block();
                } catch (e) {
                    return handler(e);
                }
            },

        TryFinally:
            function (block, handler) {
                try {
                    return block();
                } finally {
                    handler();
                }
            },

        While:
            function (guard, body) {
                while (guard()) {
                    body();
                }
            }
    }
};
;
(function()
{
 var Global=this,Runtime=this.IntelliFactory.Runtime,WebSharper,Arrays,Operators,Number,IntrinsicFunctionProxy,Array,Seq,Unchecked,Enumerator,Arrays2D,Char,Util,Concurrency,setTimeout,Date,JavaScript,Scheduler,T,Json,List,T1,Error,Math,Remoting,XhrProvider,JSON,Enumerable,Strings,String,RegExp;
 Runtime.Define(Global,{
  IntelliFactory:{
   WebSharper:{
    Arrays:{
     Find:function(f,arr)
     {
      var matchValue;
      matchValue=Arrays.tryFind(f,arr);
      return matchValue.$==0?Operators.FailWith("KeyNotFoundException"):matchValue.$0;
     },
     FindIndex:function(f,arr)
     {
      var matchValue;
      matchValue=Arrays.tryFindIndex(f,arr);
      return matchValue.$==0?Operators.FailWith("KeyNotFoundException"):matchValue.$0;
     },
     Pick:function(f,arr)
     {
      var matchValue;
      matchValue=Arrays.tryPick(f,arr);
      return matchValue.$==0?Operators.FailWith("KeyNotFoundException"):matchValue.$0;
     },
     average:function(arr)
     {
      return Number(Arrays.sum(arr))/Number(IntrinsicFunctionProxy.GetLength(arr));
     },
     averageBy:function(f,arr)
     {
      return Number(Arrays.sumBy(f,arr))/Number(IntrinsicFunctionProxy.GetLength(arr));
     },
     blit:function(arr1,start1,arr2,start2,length)
     {
      var i;
      Arrays.checkRange(arr1,start1,length);
      Arrays.checkRange(arr2,start2,length);
      for(i=0;i<=length-1;i++){
       arr2[start2+i]=arr1[start1+i];
      }
      return;
     },
     checkLength:function(arr1,arr2)
     {
      return IntrinsicFunctionProxy.GetLength(arr1)!==IntrinsicFunctionProxy.GetLength(arr2)?Operators.FailWith("Arrays differ in length."):null;
     },
     checkRange:function(arr,start,size)
     {
      return((size<0?true:start<0)?true:IntrinsicFunctionProxy.GetLength(arr)<start+size)?Operators.FailWith("Index was outside the bounds of the array."):null;
     },
     choose:function(f,arr)
     {
      var q,i,matchValue;
      q=[];
      for(i=0;i<=IntrinsicFunctionProxy.GetLength(arr)-1;i++){
       matchValue=f(arr[i]);
       if(matchValue.$==0)
        {
        }
       else
        {
         q.push(matchValue.$0);
        }
      }
      return q;
     },
     collect:function(f,x)
     {
      return Array.prototype.concat.apply([],Arrays.map(f,x));
     },
     concat:function(xs)
     {
      return Array.prototype.concat.apply([],Arrays.ofSeq(xs));
     },
     create:function(size,value)
     {
      var r,i;
      r=Array(size);
      for(i=0;i<=size-1;i++){
       r[i]=value;
      }
      return r;
     },
     exists2:function(f,arr1,arr2)
     {
      Arrays.checkLength(arr1,arr2);
      return Seq.exists2(f,arr1,arr2);
     },
     fill:function(arr,start,length,value)
     {
      var i;
      Arrays.checkRange(arr,start,length);
      for(i=start;i<=start+length-1;i++){
       arr[i]=value;
      }
      return;
     },
     filter:function(f,arr)
     {
      var r,i;
      r=[];
      for(i=0;i<=IntrinsicFunctionProxy.GetLength(arr)-1;i++){
       if(f(arr[i]))
        {
         r.push(arr[i]);
        }
      }
      return r;
     },
     fold:function(f,zero,arr)
     {
      var acc,i;
      acc=zero;
      for(i=0;i<=IntrinsicFunctionProxy.GetLength(arr)-1;i++){
       acc=(f(acc))(arr[i]);
      }
      return acc;
     },
     fold2:function(f,zero,arr1,arr2)
     {
      var accum,i;
      Arrays.checkLength(arr1,arr2);
      accum=zero;
      for(i=0;i<=arr1.length-1;i++){
       accum=((f(accum))(arr1[i]))(arr2[i]);
      }
      return accum;
     },
     foldBack:function(f,arr,zero)
     {
      var acc,len,i;
      acc=zero;
      len=IntrinsicFunctionProxy.GetLength(arr);
      for(i=1;i<=len;i++){
       acc=(f(arr[len-i]))(acc);
      }
      return acc;
     },
     foldBack2:function(f,arr1,arr2,zero)
     {
      var len,accum,i;
      Arrays.checkLength(arr1,arr2);
      len=IntrinsicFunctionProxy.GetLength(arr1);
      accum=zero;
      for(i=1;i<=len;i++){
       accum=((f(arr1[len-i]))(arr2[len-i]))(accum);
      }
      return accum;
     },
     forall2:function(f,arr1,arr2)
     {
      Arrays.checkLength(arr1,arr2);
      return Seq.forall2(f,arr1,arr2);
     },
     init:function(size,f)
     {
      var r,i;
      if(size<0)
       {
        Operators.FailWith("Negative size given.");
       }
      r=Array(size);
      for(i=0;i<=size-1;i++){
       r[i]=f(i);
      }
      return r;
     },
     iter:function(f,arr)
     {
      var i;
      for(i=0;i<=IntrinsicFunctionProxy.GetLength(arr)-1;i++){
       f(arr[i]);
      }
      return;
     },
     iter2:function(f,arr1,arr2)
     {
      var i;
      Arrays.checkLength(arr1,arr2);
      for(i=0;i<=IntrinsicFunctionProxy.GetLength(arr1)-1;i++){
       (f(arr1[i]))(arr2[i]);
      }
      return;
     },
     iteri:function(f,arr)
     {
      var i;
      for(i=0;i<=IntrinsicFunctionProxy.GetLength(arr)-1;i++){
       (f(i))(arr[i]);
      }
      return;
     },
     iteri2:function(f,arr1,arr2)
     {
      var i;
      Arrays.checkLength(arr1,arr2);
      for(i=0;i<=IntrinsicFunctionProxy.GetLength(arr1)-1;i++){
       ((f(i))(arr1[i]))(arr2[i]);
      }
      return;
     },
     map:function(f,arr)
     {
      var r,i;
      r=Array(IntrinsicFunctionProxy.GetLength(arr));
      for(i=0;i<=IntrinsicFunctionProxy.GetLength(arr)-1;i++){
       r[i]=f(arr[i]);
      }
      return r;
     },
     map2:function(f,arr1,arr2)
     {
      var r,i;
      Arrays.checkLength(arr1,arr2);
      r=Array(IntrinsicFunctionProxy.GetLength(arr2));
      for(i=0;i<=IntrinsicFunctionProxy.GetLength(arr2)-1;i++){
       r[i]=(f(arr1[i]))(arr2[i]);
      }
      return r;
     },
     mapi:function(f,arr)
     {
      var y,i;
      y=Array(IntrinsicFunctionProxy.GetLength(arr));
      for(i=0;i<=IntrinsicFunctionProxy.GetLength(arr)-1;i++){
       y[i]=(f(i))(arr[i]);
      }
      return y;
     },
     mapi2:function(f,arr1,arr2)
     {
      var res,i;
      Arrays.checkLength(arr1,arr2);
      res=Array(IntrinsicFunctionProxy.GetLength(arr1));
      for(i=0;i<=IntrinsicFunctionProxy.GetLength(arr1)-1;i++){
       res[i]=((f(i))(arr1[i]))(arr2[i]);
      }
      return res;
     },
     max:function(x)
     {
      return Arrays.reduce(function(e1)
      {
       return function(e2)
       {
        return Operators.Max(e1,e2);
       };
      },x);
     },
     maxBy:function(f,arr)
     {
      return Arrays.reduce(function(x)
      {
       return function(y)
       {
        return Unchecked.Compare(f(x),f(y))===1?x:y;
       };
      },arr);
     },
     min:function(x)
     {
      return Arrays.reduce(function(e1)
      {
       return function(e2)
       {
        return Operators.Min(e1,e2);
       };
      },x);
     },
     minBy:function(f,arr)
     {
      return Arrays.reduce(function(x)
      {
       return function(y)
       {
        return Unchecked.Compare(f(x),f(y))===-1?x:y;
       };
      },arr);
     },
     nonEmpty:function(arr)
     {
      return IntrinsicFunctionProxy.GetLength(arr)===0?Operators.FailWith("The input array was empty."):null;
     },
     ofSeq:function(xs)
     {
      var q,_enum;
      q=[];
      _enum=Enumerator.Get(xs);
      while(_enum.MoveNext())
       {
        q.push(_enum.get_Current());
       }
      return q;
     },
     partition:function(f,arr)
     {
      var ret1,ret2,i;
      ret1=[];
      ret2=[];
      for(i=0;i<=IntrinsicFunctionProxy.GetLength(arr)-1;i++){
       if(f(arr[i]))
        {
         ret1.push(arr[i]);
        }
       else
        {
         ret2.push(arr[i]);
        }
      }
      return[ret1,ret2];
     },
     permute:function(f,arr)
     {
      var ret,i;
      ret=[];
      for(i=0;i<=IntrinsicFunctionProxy.GetLength(arr)-1;i++){
       ret[f(i)]=arr[i];
      }
      return ret;
     },
     reduce:function(f,arr)
     {
      var acc,i;
      Arrays.nonEmpty(arr);
      acc=arr[0];
      for(i=1;i<=IntrinsicFunctionProxy.GetLength(arr)-1;i++){
       acc=(f(acc))(arr[i]);
      }
      return acc;
     },
     reduceBack:function(f,arr)
     {
      var len,acc,i;
      Arrays.nonEmpty(arr);
      len=IntrinsicFunctionProxy.GetLength(arr);
      acc=arr[len-1];
      for(i=2;i<=len;i++){
       acc=(f(arr[len-i]))(acc);
      }
      return acc;
     },
     reverse:function(array,offset,length)
     {
      var a;
      a=Arrays.sub(array,offset,length).slice().reverse();
      return Arrays.blit(a,0,array,offset,IntrinsicFunctionProxy.GetLength(a));
     },
     scan:function(f,zero,arr)
     {
      var ret,i;
      ret=Array(1+IntrinsicFunctionProxy.GetLength(arr));
      ret[0]=zero;
      for(i=0;i<=IntrinsicFunctionProxy.GetLength(arr)-1;i++){
       ret[i+1]=(f(ret[i]))(arr[i]);
      }
      return ret;
     },
     scanBack:function(f,arr,zero)
     {
      var len,ret,i;
      len=IntrinsicFunctionProxy.GetLength(arr);
      ret=Array(1+len);
      ret[len]=zero;
      for(i=0;i<=len-1;i++){
       ret[len-i-1]=(f(arr[len-i-1]))(ret[len-i]);
      }
      return ret;
     },
     sort:function(arr)
     {
      return Arrays.sortBy(function(x)
      {
       return x;
      },arr);
     },
     sortBy:function(f,arr)
     {
      var f1;
      f1=Runtime.Tupled(function(tupledArg)
      {
       var y;
       y=tupledArg[1];
       return Operators.Compare(f(tupledArg[0]),f(y));
      });
      return arr.slice().sort(f1);
     },
     sortInPlace:function(arr)
     {
      return Arrays.sortInPlaceBy(function(x)
      {
       return x;
      },arr);
     },
     sortInPlaceBy:function(f,arr)
     {
      return arr.sort(Runtime.Tupled(function(tupledArg)
      {
       var y;
       y=tupledArg[1];
       return Operators.Compare(f(tupledArg[0]),f(y));
      }));
     },
     sortInPlaceWith:function(comparer,arr)
     {
      return arr.sort(Runtime.Tupled(function(tupledArg)
      {
       var y;
       y=tupledArg[1];
       return(comparer(tupledArg[0]))(y);
      }));
     },
     sortWith:function(comparer,arr)
     {
      var f;
      f=Runtime.Tupled(function(tupledArg)
      {
       var y;
       y=tupledArg[1];
       return(comparer(tupledArg[0]))(y);
      });
      return arr.slice().sort(f);
     },
     sub:function(arr,start,length)
     {
      Arrays.checkRange(arr,start,length);
      return arr.slice(start,start+length);
     },
     sum:function($arr)
     {
      var $0=this,$this=this;
      var sum=0;
      for(var i=0;i<$arr.length;i++)sum+=$arr[i];
      return sum;
     },
     sumBy:function($f,$arr)
     {
      var $0=this,$this=this;
      var sum=0;
      for(var i=0;i<$arr.length;i++)sum+=$f($arr[i]);
      return sum;
     },
     tryFind:function(f,arr)
     {
      var res,i;
      res={
       $:0
      };
      i=0;
      while(i<IntrinsicFunctionProxy.GetLength(arr)?res.$==0:false)
       {
        if(f(arr[i]))
         {
          res={
           $:1,
           $0:arr[i]
          };
         }
        i=i+1;
       }
      return res;
     },
     tryFindIndex:function(f,arr)
     {
      var res,i;
      res={
       $:0
      };
      i=0;
      while(i<IntrinsicFunctionProxy.GetLength(arr)?res.$==0:false)
       {
        if(f(arr[i]))
         {
          res={
           $:1,
           $0:i
          };
         }
        i=i+1;
       }
      return res;
     },
     tryPick:function(f,arr)
     {
      var res,i,matchValue;
      res={
       $:0
      };
      i=0;
      while(i<IntrinsicFunctionProxy.GetLength(arr)?res.$==0:false)
       {
        matchValue=f(arr[i]);
        if(matchValue.$==1)
         {
          res=matchValue;
         }
        i=i+1;
       }
      return res;
     },
     unzip:function(arr)
     {
      var x,y,i,patternInput,b;
      x=[];
      y=[];
      for(i=0;i<=IntrinsicFunctionProxy.GetLength(arr)-1;i++){
       patternInput=arr[i];
       b=patternInput[1];
       x.push(patternInput[0]);
       y.push(b);
      }
      return[x,y];
     },
     unzip3:function(arr)
     {
      var x,y,z,i,matchValue,c,b;
      x=[];
      y=[];
      z=[];
      for(i=0;i<=IntrinsicFunctionProxy.GetLength(arr)-1;i++){
       matchValue=arr[i];
       c=matchValue[2];
       b=matchValue[1];
       x.push(matchValue[0]);
       y.push(b);
       z.push(c);
      }
      return[x,y,z];
     },
     zip:function(arr1,arr2)
     {
      var res,i;
      Arrays.checkLength(arr1,arr2);
      res=Array(arr1.length);
      for(i=0;i<=IntrinsicFunctionProxy.GetLength(arr1)-1;i++){
       res[i]=[arr1[i],arr2[i]];
      }
      return res;
     },
     zip3:function(arr1,arr2,arr3)
     {
      var res,i;
      Arrays.checkLength(arr1,arr2);
      Arrays.checkLength(arr2,arr3);
      res=Array(arr1.length);
      for(i=0;i<=IntrinsicFunctionProxy.GetLength(arr1)-1;i++){
       res[i]=[arr1[i],arr2[i],arr3[i]];
      }
      return res;
     }
    },
    Arrays2D:{
     copy:function(array)
     {
      return Arrays2D.init(array.length,array.length?array[0].length:0,function(i)
      {
       return function(j)
       {
        return array[i][j];
       };
      });
     },
     init:function(n,m,f)
     {
      var array,i,j;
      array=Arrays2D.zeroCreate(n,m);
      for(i=0;i<=n-1;i++){
       for(j=0;j<=m-1;j++){
        array[i][j]=(f(i))(j);
       }
      }
      return array;
     },
     iter:function(f,array)
     {
      var count1,count2,i,j;
      count1=array.length;
      count2=array.length?array[0].length:0;
      for(i=0;i<=count1-1;i++){
       for(j=0;j<=count2-1;j++){
        f(array[i][j]);
       }
      }
      return;
     },
     iteri:function(f,array)
     {
      var count1,count2,i,j;
      count1=array.length;
      count2=array.length?array[0].length:0;
      for(i=0;i<=count1-1;i++){
       for(j=0;j<=count2-1;j++){
        ((f(i))(j))(array[i][j]);
       }
      }
      return;
     },
     map:function(f,array)
     {
      return Arrays2D.init(array.length,array.length?array[0].length:0,function(i)
      {
       return function(j)
       {
        return f(array[i][j]);
       };
      });
     },
     mapi:function(f,array)
     {
      return Arrays2D.init(array.length,array.length?array[0].length:0,function(i)
      {
       return function(j)
       {
        return((f(i))(j))(array[i][j]);
       };
      });
     },
     zeroCreate:function(n,m)
     {
      return IntrinsicFunctionProxy.Array2DZeroCreate(n,m);
     }
    },
    Char:Runtime.Class({},{
     GetNumericValue:function(c)
     {
      return(c>=48?c<=57:false)?Number(c)-Number(48):-1;
     },
     IsControl:function(c)
     {
      return(c>=0?c<=31:false)?true:c>=128?c<=159:false;
     },
     IsDigit:function(c)
     {
      return c>=48?c<=57:false;
     },
     IsLetter:function(c)
     {
      return(c>=65?c<=90:false)?true:c>=97?c<=122:false;
     },
     IsLetterOrDigit:function(c)
     {
      return Char.IsLetter(c)?true:Char.IsDigit(c);
     },
     IsLower:function(c)
     {
      return c>=97?c<=122:false;
     },
     IsUpper:function(c)
     {
      return c>=65?c<=90:false;
     },
     IsWhiteSpace:function($c)
     {
      var $0=this,$this=this;
      return Global.String.fromCharCode($c).match(/\s/)!==null;
     }
    }),
    Concurrency:{
     AwaitEvent:function(e)
     {
      return{
       $:0,
       $0:function(k)
       {
        var sub;
        sub={
         contents:undefined
        };
        sub.contents=Util.subscribeTo(e,function(x)
        {
         sub.contents.Dispose();
         return k({
          $:0,
          $0:x
         });
        });
        return;
       }
      };
     },
     Bind:function(_arg1,f)
     {
      var r;
      r=_arg1.$0;
      return{
       $:0,
       $0:function(k)
       {
        return r(function(_arg2)
        {
         var x;
         if(_arg2.$==1)
          {
           return k({
            $:1,
            $0:_arg2.$0
           });
          }
         else
          {
           x=_arg2.$0;
           return Concurrency.fork(function()
           {
            var e;
            try
            {
             return Concurrency.Run(f(x),k);
            }
            catch(e)
            {
             return k({
              $:1,
              $0:e
             });
            }
           });
          }
        });
       }
      };
     },
     Catch:function(_arg1)
     {
      var r;
      r=_arg1.$0;
      return{
       $:0,
       $0:function(k)
       {
        var e;
        try
        {
         return r(function(_arg2)
         {
          return _arg2.$==1?k({
           $:0,
           $0:{
            $:1,
            $0:_arg2.$0
           }
          }):k({
           $:0,
           $0:{
            $:0,
            $0:_arg2.$0
           }
          });
         });
        }
        catch(e)
        {
         return k({
          $:0,
          $0:{
           $:1,
           $0:e
          }
         });
        }
       }
      };
     },
     Delay:function(mk)
     {
      return{
       $:0,
       $0:function(k)
       {
        var e;
        try
        {
         return Concurrency.Run(mk(null),k);
        }
        catch(e)
        {
         return k({
          $:1,
          $0:e
         });
        }
       }
      };
     },
     For:function(s,b)
     {
      var ie;
      ie=Enumerator.Get(s);
      return Concurrency.While(function()
      {
       return ie.MoveNext();
      },Concurrency.Delay(function()
      {
       return b(ie.get_Current());
      }));
     },
     FromContinuations:function(subscribe)
     {
      return{
       $:0,
       $0:function(k)
       {
        return(subscribe(function(a)
        {
         return k({
          $:0,
          $0:a
         });
        }))(function(e)
        {
         return k({
          $:1,
          $0:e
         });
        });
       }
      };
     },
     Parallel:function(cs)
     {
      var cs1;
      cs1=Arrays.ofSeq(cs);
      return IntrinsicFunctionProxy.GetLength(cs1)===0?Concurrency.Return([]):{
       $:0,
       $0:function(k)
       {
        var n,o,a;
        n=cs1.length;
        o={
         contents:n
        };
        a=Arrays.create(n,undefined);
        return Arrays.iteri(function(i)
        {
         return function(_arg1)
         {
          var run;
          run=_arg1.$0;
          return Concurrency.fork(function()
          {
           return run(function(x)
           {
            var matchValue,e,e1,n1;
            matchValue=[o.contents,x];
            if(matchValue[0]===0)
             {
              return null;
             }
            else
             {
              if(matchValue[0]===1)
               {
                if(matchValue[1].$==1)
                 {
                  e=matchValue[1].$0;
                  o.contents=0;
                  return k({
                   $:1,
                   $0:e
                  });
                 }
                else
                 {
                  a[i]=matchValue[1].$0;
                  o.contents=0;
                  return k({
                   $:0,
                   $0:a
                  });
                 }
               }
              else
               {
                if(matchValue[1].$==1)
                 {
                  e1=matchValue[1].$0;
                  o.contents=0;
                  return k({
                   $:1,
                   $0:e1
                  });
                 }
                else
                 {
                  n1=matchValue[0];
                  a[i]=matchValue[1].$0;
                  o.contents=n1-1;
                  return;
                 }
               }
             }
           });
          });
         };
        },cs1);
       }
      };
     },
     Return:function(x)
     {
      return{
       $:0,
       $0:function(k)
       {
        return k({
         $:0,
         $0:x
        });
       }
      };
     },
     Run:function(_arg1,x)
     {
      return _arg1.$0.call(null,x);
     },
     Scheduler:Runtime.Class({
      Fork:function(action)
      {
       var _this=this;
       this.robin.push(action);
       if(this.idle)
        {
         this.idle=false;
         return setTimeout(function()
         {
          return _this.tick();
         },0);
        }
       else
        {
         return null;
        }
      },
      tick:function()
      {
       var t,loop,_this=this;
       t=Date.now();
       loop=true;
       while(loop)
        {
         if(this.robin.length===0)
          {
           this.idle=true;
           loop=false;
          }
         else
          {
           (this.robin.shift())(null);
           if(Date.now()-t>40)
            {
             setTimeout(function()
             {
              return _this.tick();
             },0);
             loop=false;
            }
          }
        }
       return;
      }
     },{
      New:function()
      {
       var r;
       r=Runtime.New(this,{});
       r.idle=true;
       r.robin=[];
       return r;
      }
     }),
     Sleep:function(ms)
     {
      return{
       $:0,
       $0:function(k)
       {
        return setTimeout(function()
        {
         return k({
          $:0,
          $0:null
         });
        },ms);
       }
      };
     },
     Start:function(c)
     {
      return Concurrency.StartWithContinuations(c,function()
      {
      },function(exn)
      {
       return JavaScript.Log(["WebSharper: Uncaught asynchronous exception",exn]);
      });
     },
     StartChild:function(_arg1)
     {
      var r;
      r=_arg1.$0;
      return{
       $:0,
       $0:function(k)
       {
        var cached,queue;
        cached={
         contents:{
          $:0
         }
        };
        queue=[];
        Concurrency.fork(function()
        {
         return r(function(res)
         {
          cached.contents={
           $:1,
           $0:res
          };
          while(queue.length>0)
           {
            (queue.shift())(res);
           }
          return;
         });
        });
        return k({
         $:0,
         $0:{
          $:0,
          $0:function(k1)
          {
           var matchValue;
           matchValue=cached.contents;
           return matchValue.$==0?queue.push(k1):k1(matchValue.$0);
          }
         }
        });
       }
      };
     },
     StartWithContinuations:function(c,s,f)
     {
      return Concurrency.fork(function()
      {
       return Concurrency.Run(c,function(_arg1)
       {
        return _arg1.$==1?f(_arg1.$0):s(_arg1.$0);
       });
      });
     },
     TryFinally:function(_arg1,f)
     {
      var run;
      run=_arg1.$0;
      return{
       $:0,
       $0:function(k)
       {
        return run(function(r)
        {
         var e;
         try
         {
          f(null);
          return k(r);
         }
         catch(e)
         {
          return k({
           $:1,
           $0:e
          });
         }
        });
       }
      };
     },
     TryWith:function(_arg1,f)
     {
      var r;
      r=_arg1.$0;
      return{
       $:0,
       $0:function(k)
       {
        return r(function(_arg2)
        {
         var e,e1;
         if(_arg2.$==1)
          {
           e=_arg2.$0;
           try
           {
            return Concurrency.Run(f(e),k);
           }
           catch(e1)
           {
            return k({
             $:1,
             $0:e1
            });
           }
          }
         else
          {
           return k({
            $:0,
            $0:_arg2.$0
           });
          }
        });
       }
      };
     },
     Using:function(x,f)
     {
      return Concurrency.TryFinally(f(x),function()
      {
       return x.Dispose();
      });
     },
     While:function(g,c)
     {
      return g(null)?Concurrency.Bind(c,function()
      {
       return Concurrency.While(g,c);
      }):Concurrency.Return(null);
     },
     fork:function(action)
     {
      return Concurrency.scheduler().Fork(action);
     },
     scheduler:Runtime.Field(function()
     {
      return Scheduler.New();
     })
    },
    DateTimeHelpers:{
     AddMonths:function(d,months)
     {
      var e;
      e=new Date(d);
      return(new Date(e.getFullYear(),e.getMonth()+months,e.getDate(),e.getHours(),e.getMinutes(),e.getSeconds(),e.getMilliseconds())).getTime();
     },
     AddYears:function(d,years)
     {
      var e;
      e=new Date(d);
      return(new Date(e.getFullYear()+years,e.getMonth(),e.getDate(),e.getHours(),e.getMinutes(),e.getSeconds(),e.getMilliseconds())).getTime();
     },
     DatePortion:function(d)
     {
      var e;
      e=new Date(d);
      return(new Date(e.getFullYear(),e.getMonth(),e.getDate())).getTime();
     },
     TimePortion:function(d)
     {
      var e;
      e=new Date(d);
      return(((24*0+e.getHours())*60+e.getMinutes())*60+e.getSeconds())*1000+e.getMilliseconds();
     }
    },
    Enumerable:{
     Of:function(getEnumerator)
     {
      return{
       GetEnumerator:getEnumerator
      };
     }
    },
    Enumerator:{
     Get:function(x)
     {
      return x instanceof Global.Array?T.New(0,null,function(e)
      {
       var i;
       i=e.s;
       if(i<IntrinsicFunctionProxy.GetLength(x))
        {
         e.c=x[i];
         e.s=i+1;
         return true;
        }
       else
        {
         return false;
        }
      }):Unchecked.Equals(typeof x,"string")?T.New(0,null,function(e)
      {
       var i;
       i=e.s;
       if(i<x.length)
        {
         e.c=x.charCodeAt(i);
         e.s=i+1;
         return true;
        }
       else
        {
         return false;
        }
      }):x.GetEnumerator();
     },
     T:Runtime.Class({
      MoveNext:function()
      {
       return this.n.call(null,this);
      },
      get_Current:function()
      {
       return this.c;
      }
     },{
      New:function(s,c,n)
      {
       var r;
       r=Runtime.New(this,{});
       r.s=s;
       r.c=c;
       r.n=n;
       return r;
      }
     })
    },
    ExtraTopLevelOperatorsProxy:{
     array2D:function(rows)
     {
      var x;
      x=Arrays.ofSeq(Seq.map(function(source)
      {
       return Arrays.ofSeq(source);
      },rows));
      x.dims=2;
      return x;
     }
    },
    IntrinsicFunctionProxy:{
     Array2DZeroCreate:function(n,m)
     {
      var arr;
      arr=Arrays.init(n,function()
      {
       return Array(m);
      });
      arr.dims=2;
      return arr;
     },
     GetArray2DSub:function(src,src1,src2,len1,len2)
     {
      var len11,len21,dst,i,j;
      len11=len1<0?0:len1;
      len21=len2<0?0:len2;
      dst=IntrinsicFunctionProxy.Array2DZeroCreate(len11,len21);
      for(i=0;i<=len11-1;i++){
       for(j=0;j<=len21-1;j++){
        dst[i][j]=src[src1+i][src2+j];
       }
      }
      return dst;
     },
     GetArraySub:function(arr,start,len)
     {
      var dst,i;
      dst=Array(len);
      for(i=0;i<=len-1;i++){
       dst[i]=arr[start+1];
      }
      return dst;
     },
     GetLength:function(arr)
     {
      return arr.dims===2?arr.length*arr.length:arr.length;
     },
     SetArray2DSub:function(dst,src1,src2,len1,len2,src)
     {
      var i,j;
      for(i=0;i<=len1-1;i++){
       for(j=0;j<=len2-1;j++){
        dst[src1+i][src2+j]=src[i][j];
       }
      }
      return;
     },
     SetArraySub:function(arr,start,len,src)
     {
      var i;
      for(i=0;i<=len-1;i++){
       arr[start+i]=src[i];
      }
      return;
     }
    },
    JavaScript:{
     Delete:function($x,$field)
     {
      var $0=this,$this=this;
      return delete $x[$field];
     },
     ForEach:function($x,$iter)
     {
      var $0=this,$this=this;
      for(var k in $x){
       if($iter(k))
        break;
      }
     },
     GetFieldNames:function($o)
     {
      var $0=this,$this=this;
      var r=[];
      for(var k in $o)r.push(k);
      return r;
     },
     GetFieldValues:function($o)
     {
      var $0=this,$this=this;
      var r=[];
      for(var k in $o)r.push($o[k]);
      return r;
     },
     GetFields:function($o)
     {
      var $0=this,$this=this;
      var r=[];
      for(var k in $o)r.push([k,$o[k]]);
      return r;
     },
     Log:function($x)
     {
      var $0=this,$this=this;
      if(Global.console)
       Global.console.log($x);
     }
    },
    Json:{
     Activate:function(json)
     {
      var types,i,decode;
      types=json.$TYPES;
      for(i=0;i<=IntrinsicFunctionProxy.GetLength(types)-1;i++){
       types[i]=Json.lookup(types[i]);
      }
      decode=function(x)
      {
       var o,ti;
       if(Unchecked.Equals(x,null))
        {
         return x;
        }
       else
        {
         if(typeof x==="object")
          {
           if(x instanceof Global.Array)
            {
             return Json.shallowMap(decode,x);
            }
           else
            {
             o=Json.shallowMap(decode,x.$V);
             ti=x.$T;
             return Unchecked.Equals(typeof ti,"undefined")?o:Json.restore(types[ti],o);
            }
          }
         else
          {
           return x;
          }
        }
      };
      return decode(json.$DATA);
     },
     lookup:function(x)
     {
      var k,r,i,n,rn;
      k=IntrinsicFunctionProxy.GetLength(x);
      r=Global;
      i=0;
      while(i<k)
       {
        n=x[i];
        rn=r[n];
        if(!Unchecked.Equals(typeof rn,undefined))
         {
          r=rn;
          i=i+1;
         }
        else
         {
          Operators.FailWith("Invalid server reply. Failed to find type: "+n);
         }
       }
      return r;
     },
     restore:function(ty,obj)
     {
      var r;
      r=new ty();
      JavaScript.ForEach(obj,function(k)
      {
       r[k]=obj[k];
       return false;
      });
      return r;
     },
     shallowMap:function(f,x)
     {
      var r;
      if(x instanceof Global.Array)
       {
        return Arrays.map(f,x);
       }
      else
       {
        if(typeof x==="object")
         {
          r={};
          JavaScript.ForEach(x,function(y)
          {
           r[y]=f(x[y]);
           return false;
          });
          return r;
         }
        else
         {
          return x;
         }
       }
     }
    },
    Lazy:{
     Create:function(f)
     {
      var x;
      x={
       value:undefined,
       created:false,
       eval:f
      };
      x.eval=function()
      {
       if(x.created)
        {
         return x.value;
        }
       else
        {
         x.created=true;
         x.value=f(null);
         return x.value;
        }
      };
      return x;
     },
     CreateFromValue:function(v)
     {
      return{
       value:v,
       created:true,
       eval:function()
       {
        return v;
       },
       eval:function()
       {
        return v;
       }
      };
     },
     Force:function(x)
     {
      return x.eval.call(null,null);
     }
    },
    List:{
     T:Runtime.Class({
      GetEnumerator:function()
      {
       return T.New(this,null,function(e)
       {
        var matchValue,xs;
        matchValue=e.s;
        if(matchValue.$==0)
         {
          return false;
         }
        else
         {
          xs=matchValue.$1;
          e.c=matchValue.$0;
          e.s=xs;
          return true;
         }
       });
      },
      get_Item:function(x)
      {
       return Seq.nth(x,this);
      },
      get_Length:function()
      {
       return Seq.length(this);
      }
     },{
      Construct:function(head,tail)
      {
       return Runtime.New(T1,{
        $:1,
        $0:head,
        $1:tail
       });
      },
      get_Nil:function()
      {
       return Runtime.New(T1,{
        $:0
       });
      }
     }),
     append:function(x,y)
     {
      return List.ofSeq(Seq.append(x,y));
     },
     choose:function(f,l)
     {
      return List.ofSeq(Seq.choose(f,l));
     },
     collect:function(f,l)
     {
      return List.ofSeq(Seq.collect(f,l));
     },
     concat:function(s)
     {
      return List.ofSeq(Seq.concat(s));
     },
     exists2:function(p,l1,l2)
     {
      return Arrays.exists2(p,Arrays.ofSeq(l1),Arrays.ofSeq(l2));
     },
     filter:function(p,l)
     {
      return List.ofSeq(Seq.filter(p,l));
     },
     fold2:function(f,s,l1,l2)
     {
      return Arrays.fold2(f,s,Arrays.ofSeq(l1),Arrays.ofSeq(l2));
     },
     foldBack:function(f,l,s)
     {
      return Arrays.foldBack(f,Arrays.ofSeq(l),s);
     },
     foldBack2:function(f,l1,l2,s)
     {
      return Arrays.foldBack2(f,Arrays.ofSeq(l1),Arrays.ofSeq(l2),s);
     },
     forall2:function(p,l1,l2)
     {
      return Arrays.forall2(p,Arrays.ofSeq(l1),Arrays.ofSeq(l2));
     },
     init:function(s,f)
     {
      return List.ofArray(Arrays.init(s,f));
     },
     iter2:function(f,l1,l2)
     {
      return Arrays.iter2(f,Arrays.ofSeq(l1),Arrays.ofSeq(l2));
     },
     iteri2:function(f,l1,l2)
     {
      return Arrays.iteri2(f,Arrays.ofSeq(l1),Arrays.ofSeq(l2));
     },
     map:function(f,l)
     {
      return List.ofSeq(Seq.map(f,l));
     },
     map2:function(f,l1,l2)
     {
      return List.ofArray(Arrays.map2(f,Arrays.ofSeq(l1),Arrays.ofSeq(l2)));
     },
     map3:function(f,l1,l2,l3)
     {
      return List.ofArray(Arrays.map2(function(func)
      {
       return function(arg1)
       {
        return func(arg1);
       };
      },Arrays.map2(f,Arrays.ofSeq(l1),Arrays.ofSeq(l2)),Arrays.ofSeq(l3)));
     },
     mapi:function(f,l)
     {
      return List.ofSeq(Seq.mapi(f,l));
     },
     mapi2:function(f,l1,l2)
     {
      return List.ofArray(Arrays.mapi2(f,Arrays.ofSeq(l1),Arrays.ofSeq(l2)));
     },
     max:function(l)
     {
      return Seq.reduce(function(e1)
      {
       return function(e2)
       {
        return Operators.Max(e1,e2);
       };
      },l);
     },
     maxBy:function(f,l)
     {
      return Seq.reduce(function(x)
      {
       return function(y)
       {
        return Unchecked.Compare(f(x),f(y))===1?x:y;
       };
      },l);
     },
     min:function(l)
     {
      return Seq.reduce(function(e1)
      {
       return function(e2)
       {
        return Operators.Min(e1,e2);
       };
      },l);
     },
     minBy:function(f,l)
     {
      return Seq.reduce(function(x)
      {
       return function(y)
       {
        return Unchecked.Compare(f(x),f(y))===-1?x:y;
       };
      },l);
     },
     ofArray:function(arr)
     {
      var r,i;
      r=Runtime.New(T1,{
       $:0
      });
      for(i=0;i<=IntrinsicFunctionProxy.GetLength(arr)-1;i++){
       r=Runtime.New(T1,{
        $:1,
        $0:arr[IntrinsicFunctionProxy.GetLength(arr)-i-1],
        $1:r
       });
      }
      return r;
     },
     ofSeq:function(s)
     {
      var r,e,x;
      r=[];
      e=Enumerator.Get(s);
      while(e.MoveNext())
       {
        r.unshift(e.get_Current());
       }
      x=r.slice(0);
      x.reverse();
      return List.ofArray(x);
     },
     partition:function(p,l)
     {
      var patternInput,b;
      patternInput=Arrays.partition(p,Arrays.ofSeq(l));
      b=patternInput[1];
      return[List.ofArray(patternInput[0]),List.ofArray(b)];
     },
     permute:function(f,l)
     {
      return List.ofArray(Arrays.permute(f,Arrays.ofSeq(l)));
     },
     reduceBack:function(f,l)
     {
      return Arrays.reduceBack(f,Arrays.ofSeq(l));
     },
     replicate:function(size,value)
     {
      return List.ofArray(Arrays.create(size,value));
     },
     rev:function(l)
     {
      var a;
      a=Arrays.ofSeq(l);
      a.reverse();
      return List.ofArray(a);
     },
     scan:function(f,s,l)
     {
      return List.ofSeq(Seq.scan(f,s,l));
     },
     scanBack:function(f,l,s)
     {
      return List.ofArray(Arrays.scanBack(f,Arrays.ofSeq(l),s));
     },
     sort:function(l)
     {
      var a;
      a=Arrays.ofSeq(l);
      Arrays.sortInPlace(a);
      return List.ofArray(a);
     },
     sortBy:function(f,l)
     {
      return List.sortWith(function(x)
      {
       return function(y)
       {
        return Operators.Compare(f(x),f(y));
       };
      },l);
     },
     sortWith:function(f,l)
     {
      var a;
      a=Arrays.ofSeq(l);
      Arrays.sortInPlaceWith(f,a);
      return List.ofArray(a);
     },
     unzip:function(l)
     {
      var x,y,enumerator,forLoopVar,b;
      x=[];
      y=[];
      enumerator=Enumerator.Get(l);
      while(enumerator.MoveNext())
       {
        forLoopVar=enumerator.get_Current();
        b=forLoopVar[1];
        x.push(forLoopVar[0]);
        y.push(b);
       }
      return[List.ofArray(x.slice(0)),List.ofArray(y.slice(0))];
     },
     unzip3:function(l)
     {
      var x,y,z,enumerator,forLoopVar,c,b;
      x=[];
      y=[];
      z=[];
      enumerator=Enumerator.Get(l);
      while(enumerator.MoveNext())
       {
        forLoopVar=enumerator.get_Current();
        c=forLoopVar[2];
        b=forLoopVar[1];
        x.push(forLoopVar[0]);
        y.push(b);
        z.push(c);
       }
      return[List.ofArray(x.slice(0)),List.ofArray(y.slice(0)),List.ofArray(z.slice(0))];
     },
     zip:function(l1,l2)
     {
      return List.ofArray(Arrays.zip(Arrays.ofSeq(l1),Arrays.ofSeq(l2)));
     },
     zip3:function(l1,l2,l3)
     {
      return List.ofArray(Arrays.zip3(Arrays.ofSeq(l1),Arrays.ofSeq(l2),Arrays.ofSeq(l3)));
     }
    },
    OperatorIntrinsics:{
     GetArraySlice:function(source,start,finish)
     {
      var matchValue;
      matchValue=[start,finish];
      return matchValue[0].$==0?matchValue[1].$==1?source.slice(0,matchValue[1].$0+1):[]:matchValue[1].$==0?source.slice(matchValue[0].$0):source.slice(matchValue[0].$0,matchValue[1].$0+1);
     },
     GetArraySlice2D:function(arr,start1,finish1,start2,finish2)
     {
      var start11,start21;
      start11=start1.$==1?start1.$0:0;
      start21=start2.$==1?start2.$0:0;
      return IntrinsicFunctionProxy.GetArray2DSub(arr,start11,start21,(finish1.$==1?finish1.$0:arr.length-1)-start11+1,(finish2.$==1?finish2.$0:(arr.length?arr[0].length:0)-1)-start21+1);
     },
     GetArraySlice2DFixed1:function(arr,fixed1,start2,finish2)
     {
      var start21,len2,dst,j;
      start21=start2.$==1?start2.$0:0;
      len2=(finish2.$==1?finish2.$0:(arr.length?arr[0].length:0)-1)-start21+1;
      dst=Array(len2);
      for(j=0;j<=len2-1;j++){
       dst[j]=arr[fixed1][start21+j];
      }
      return dst;
     },
     GetArraySlice2DFixed2:function(arr,start1,finish1,fixed2)
     {
      var start11,len1,dst,i;
      start11=start1.$==1?start1.$0:0;
      len1=(finish1.$==1?finish1.$0:arr.length-1)-start11+1;
      dst=Array(len1);
      for(i=0;i<=len1-1;i++){
       dst[i]=arr[start11+i][fixed2];
      }
      return dst;
     },
     GetStringSlice:function(source,start,finish)
     {
      var matchValue;
      matchValue=[start,finish];
      return matchValue[0].$==0?matchValue[1].$==1?source.slice(0,matchValue[1].$0+1):"":matchValue[1].$==0?source.slice(matchValue[0].$0):source.slice(matchValue[0].$0,matchValue[1].$0+1);
     },
     SetArraySlice:function(dst,start,finish,src)
     {
      var start1;
      start1=start.$==1?start.$0:0;
      return IntrinsicFunctionProxy.SetArraySub(dst,start1,(finish.$==1?finish.$0:IntrinsicFunctionProxy.GetLength(dst)-1)-start1+1,src);
     },
     SetArraySlice2D:function(dst,start1,finish1,start2,finish2,src)
     {
      var start11,start21;
      start11=start1.$==1?start1.$0:0;
      start21=start2.$==1?start2.$0:0;
      return IntrinsicFunctionProxy.SetArray2DSub(dst,start11,start21,(finish1.$==1?finish1.$0:dst.length-1)-start11+1,(finish2.$==1?finish2.$0:(dst.length?dst[0].length:0)-1)-start21+1,src);
     },
     SetArraySlice2DFixed1:function(dst,fixed1,start2,finish2,src)
     {
      var start21,len2,j;
      start21=start2.$==1?start2.$0:0;
      len2=(finish2.$==1?finish2.$0:(dst.length?dst[0].length:0)-1)-start21+1;
      for(j=0;j<=len2-1;j++){
       dst[fixed1][start21+j]=src[j];
      }
      return;
     },
     SetArraySlice2DFixed2:function(dst,start1,finish1,fixed2,src)
     {
      var start11,len1,i;
      start11=start1.$==1?start1.$0:0;
      len1=(finish1.$==1?finish1.$0:dst.length-1)-start11+1;
      for(i=0;i<=len1-1;i++){
       dst[start11+i][fixed2]=src[i];
      }
      return;
     }
    },
    Operators:{
     Compare:function(a,b)
     {
      return Unchecked.Compare(a,b);
     },
     Decrement:function(x)
     {
      x.contents=x.contents-1;
     },
     DefaultArg:function(x,d)
     {
      return x.$==0?d:x.$0;
     },
     FailWith:function(msg)
     {
      return Operators.Raise(new Error(msg));
     },
     Increment:function(x)
     {
      x.contents=x.contents+1;
     },
     KeyValue:function(kvp)
     {
      return[kvp.K,kvp.V];
     },
     Max:function(a,b)
     {
      return Unchecked.Compare(a,b)===1?a:b;
     },
     Min:function(a,b)
     {
      return Unchecked.Compare(a,b)===-1?a:b;
     },
     Pown:function(a,n)
     {
      var p;
      p=function(n1)
      {
       var b;
       if(n1===1)
        {
         return a;
        }
       else
        {
         if(n1%2===0)
          {
           b=p(n1/2>>0);
           return b*b;
          }
         else
          {
           return a*p(n1-1);
          }
        }
      };
      return p(n);
     },
     Raise:function($e)
     {
      var $0=this,$this=this;
      throw $e;
     },
     Sign:function(x)
     {
      return x===0?0:x<0?-1:1;
     },
     Truncate:function(x)
     {
      return x<0?Math.ceil(x):Math.floor(x);
     },
     Using:function(t,f)
     {
      try
      {
       return f(t);
      }
      finally
      {
       t.Dispose();
      }
     },
     range:function(min,max)
     {
      return Seq.init(1+max-min,function(x)
      {
       return x+min;
      });
     },
     step:function(min,step,max)
     {
      var s;
      s=Operators.Sign(step);
      return Seq.takeWhile(function(k)
      {
       return s*(max-k)>=0;
      },Seq.initInfinite(function(k)
      {
       return min+k*step;
      }));
     }
    },
    Option:{
     bind:function(f,x)
     {
      return x.$==0?{
       $:0
      }:f(x.$0);
     },
     exists:function(p,x)
     {
      return x.$==0?false:p(x.$0);
     },
     fold:function(f,s,x)
     {
      var x1;
      if(x.$==0)
       {
        return s;
       }
      else
       {
        x1=x.$0;
        return(f(s))(x1);
       }
     },
     foldBack:function(f,x,s)
     {
      return x.$==0?s:(f(x.$0))(s);
     },
     forall:function(p,x)
     {
      return x.$==0?true:p(x.$0);
     },
     iter:function(p,x)
     {
      return x.$==0?null:p(x.$0);
     },
     map:function(f,x)
     {
      return x.$==0?{
       $:0
      }:{
       $:1,
       $0:f(x.$0)
      };
     },
     toArray:function(x)
     {
      return x.$==0?[]:[x.$0];
     },
     toList:function(x)
     {
      return x.$==0?Runtime.New(T1,{
       $:0
      }):List.ofArray([x.$0]);
     }
    },
    Pervasives:{
     NewFromList:function(fields)
     {
      var r,enumerator,forLoopVar;
      r={};
      enumerator=Enumerator.Get(fields);
      while(enumerator.MoveNext())
       {
        forLoopVar=enumerator.get_Current();
        r[forLoopVar[0]]=forLoopVar[1];
       }
      return r;
     }
    },
    Queue:{
     Clear:function(a)
     {
      return a.splice(0,IntrinsicFunctionProxy.GetLength(a));
     },
     Contains:function(a,el)
     {
      return Seq.exists(function(y)
      {
       return Unchecked.Equals(el,y);
      },a);
     },
     CopyTo:function(a,array,index)
     {
      return Arrays.blit(a,0,array,index,IntrinsicFunctionProxy.GetLength(a));
     }
    },
    Remoting:{
     AjaxProvider:Runtime.Field(function()
     {
      return XhrProvider.New();
     }),
     Async:function(m,data)
     {
      var headers,payload,callback;
      headers=Remoting.makeHeaders(m);
      payload=Remoting.makePayload(data);
      callback=Runtime.Tupled(function(tupledArg)
      {
       var ok,err,ok1,arg00;
       ok=tupledArg[0];
       err=tupledArg[1];
       ok1=function(x)
       {
        return ok(Json.Activate(JSON.parse(x)));
       };
       arg00=Remoting.EndPoint();
       return Remoting.AjaxProvider().Async(arg00,headers,payload,ok1,err);
      });
      return Concurrency.FromContinuations(function(ok)
      {
       return function(no)
       {
        return callback([ok,no,function()
        {
        }]);
       };
      });
     },
     Call:function(m,data)
     {
      var arg00,arg10,arg20;
      arg00=Remoting.EndPoint();
      arg10=Remoting.makeHeaders(m);
      arg20=Remoting.makePayload(data);
      return Json.Activate(JSON.parse(Remoting.AjaxProvider().Sync(arg00,arg10,arg20)));
     },
     EndPoint:Runtime.Field(function()
     {
      return"?";
     }),
     Send:function(m,data)
     {
      return Concurrency.Start(Concurrency.Bind(Remoting.Async(m,data),function()
      {
       return Concurrency.Return(null);
      }));
     },
     XhrProvider:Runtime.Class({
      Async:function(url,headers,data,ok,err)
      {
       return Remoting.ajax(true,url,headers,data,ok,err);
      },
      Sync:function(url,headers,data)
      {
       var res;
       res={
        contents:undefined
       };
       Remoting.ajax(false,url,headers,data,function(x)
       {
        res.contents=x;
       },function(e)
       {
        return Operators.Raise(e);
       });
       return res.contents;
      }
     },{
      New:function()
      {
       return Runtime.New(this,{});
      }
     }),
     ajax:function($async,$url,$headers,$data,$ok,$err)
     {
      var $0=this,$this=this;
      var xhr=new Global.XMLHttpRequest();
      xhr.open("POST",$url,$async);
      for(var h in $headers){
       xhr.setRequestHeader(h,$headers[h]);
      }
      function k()
      {
       if(xhr.status==200)
        {
         $ok(xhr.responseText);
        }
       else
        {
         var msg="Response status is not 200: ";
         $err(new Global.Error(msg+xhr.status));
        }
      }
      if("onload"in xhr)
       {
        xhr.onload=xhr.onerror=xhr.onabort=k;
       }
      else
       {
        xhr.onreadystatechange=function()
        {
         if(xhr.readyState==4)
          {
           k();
          }
        };
       }
      xhr.send($data);
     },
     makeHeaders:function(m)
     {
      var headers;
      headers={};
      headers["content-type"]="application/json";
      headers["x-websharper-rpc"]=m;
      return headers;
     },
     makePayload:function(data)
     {
      return JSON.stringify(data);
     }
    },
    Seq:{
     append:function(s1,s2)
     {
      return Enumerable.Of(function()
      {
       var e1;
       e1=Enumerator.Get(s1);
       return T.New(e1,null,function(x)
       {
        var e2;
        if(x.s.MoveNext())
         {
          x.c=x.s.get_Current();
          return true;
         }
        else
         {
          if(x.s===e1)
           {
            e2=Enumerator.Get(s2);
            x.s=e2;
            if(e2.MoveNext())
             {
              x.c=e2.get_Current();
              return true;
             }
            else
             {
              return false;
             }
           }
          else
           {
            return false;
           }
         }
       });
      });
     },
     average:function(s)
     {
      var patternInput;
      patternInput=Seq.fold(Runtime.Tupled(function(tupledArg)
      {
       var n,s1;
       n=tupledArg[0];
       s1=tupledArg[1];
       return function(x)
       {
        return[n+1,s1+x];
       };
      }),[0,0],s);
      return patternInput[1]/patternInput[0];
     },
     averageBy:function(f,s)
     {
      var patternInput;
      patternInput=Seq.fold(Runtime.Tupled(function(tupledArg)
      {
       var n,s1;
       n=tupledArg[0];
       s1=tupledArg[1];
       return function(x)
       {
        return[n+1,s1+f(x)];
       };
      }),[0,0],s);
      return patternInput[1]/patternInput[0];
     },
     cache:function(s)
     {
      var cache,_enum;
      cache=[];
      _enum=Enumerator.Get(s);
      return Enumerable.Of(function()
      {
       return T.New(0,null,function(e)
       {
        if(e.s+1<cache.length)
         {
          e.s=e.s+1;
          e.c=cache[e.s];
          return true;
         }
        else
         {
          if(_enum.MoveNext())
           {
            e.s=e.s+1;
            e.c=_enum.get_Current();
            cache.push(e.get_Current());
            return true;
           }
          else
           {
            return false;
           }
         }
       });
      });
     },
     choose:function(f,s)
     {
      return Seq.collect(function(x)
      {
       var matchValue;
       matchValue=f(x);
       return matchValue.$==0?Runtime.New(T1,{
        $:0
       }):List.ofArray([matchValue.$0]);
      },s);
     },
     collect:function(f,s)
     {
      return Seq.concat(Seq.map(f,s));
     },
     compareWith:function(f,s1,s2)
     {
      var e1,e2,r,loop,matchValue;
      e1=Enumerator.Get(s1);
      e2=Enumerator.Get(s2);
      r=0;
      loop=true;
      while(loop?r===0:false)
       {
        matchValue=[e1.MoveNext(),e2.MoveNext()];
        if(matchValue[0])
         {
          if(matchValue[1])
           {
            r=(f(e1.get_Current()))(e2.get_Current());
           }
          else
           {
            r=1;
           }
         }
        else
         {
          if(matchValue[1])
           {
            r=-1;
           }
          else
           {
            loop=false;
           }
         }
       }
      return r;
     },
     concat:function(ss)
     {
      return Enumerable.Of(function()
      {
       var outerE,next;
       outerE=Enumerator.Get(ss);
       next=function(st)
       {
        var matchValue;
        matchValue=st.s;
        if(Unchecked.Equals(matchValue,null))
         {
          if(outerE.MoveNext())
           {
            st.s=Enumerator.Get(outerE.get_Current());
            return next(st);
           }
          else
           {
            return false;
           }
         }
        else
         {
          if(matchValue.MoveNext())
           {
            st.c=matchValue.get_Current();
            return true;
           }
          else
           {
            st.s=null;
            return next(st);
           }
         }
       };
       return T.New(null,null,next);
      });
     },
     countBy:function(f,s)
     {
      return Seq.delay(function()
      {
       var d,e,keys,k,h;
       d={};
       e=Enumerator.Get(s);
       keys=[];
       while(e.MoveNext())
        {
         k=f(e.get_Current());
         h=Unchecked.Hash(k);
         if(d.hasOwnProperty(h))
          {
           d[h]=d[h]+1;
          }
         else
          {
           keys.push(k);
           d[h]=1;
          }
        }
       return Arrays.map(function(k1)
       {
        return[k1,d[Unchecked.Hash(k1)]];
       },keys.slice(0));
      });
     },
     delay:function(f)
     {
      return Enumerable.Of(function()
      {
       return Enumerator.Get(f(null));
      });
     },
     distinct:function(s)
     {
      return Seq.distinctBy(function(x)
      {
       return x;
      },s);
     },
     distinctBy:function(f,s)
     {
      return Enumerable.Of(function()
      {
       var _enum,seen;
       _enum=Enumerator.Get(s);
       seen={};
       return T.New(null,null,function(e)
       {
        var cur,h,check,has;
        if(_enum.MoveNext())
         {
          cur=_enum.get_Current();
          h=function(c)
          {
           return Unchecked.Hash(f(c));
          };
          check=function(c)
          {
           return seen.hasOwnProperty(h(c));
          };
          has=check(cur);
          while(has?_enum.MoveNext():false)
           {
            cur=_enum.get_Current();
            has=check(cur);
           }
          if(has)
           {
            return false;
           }
          else
           {
            seen[h(cur)]=null;
            e.c=cur;
            return true;
           }
         }
        else
         {
          return false;
         }
       });
      });
     },
     empty:function()
     {
      return[];
     },
     enumFinally:function(s,f)
     {
      return Enumerable.Of(function()
      {
       var e,e1;
       try
       {
        e=Enumerator.Get(s);
       }
       catch(e1)
       {
        f(null);
        e=Operators.Raise(e1);
       }
       return T.New(null,null,function(x)
       {
        var e2;
        try
        {
         if(e.MoveNext())
          {
           x.c=e.get_Current();
           return true;
          }
         else
          {
           f(null);
           return false;
          }
        }
        catch(e2)
        {
         f(null);
         return Operators.Raise(e2);
        }
       });
      });
     },
     enumUsing:function(x,f)
     {
      return f(x);
     },
     enumWhile:function(f,s)
     {
      return Enumerable.Of(function()
      {
       var next;
       next=function(en)
       {
        var matchValue,e;
        matchValue=en.s;
        if(matchValue.$==1)
         {
          e=matchValue.$0;
          if(e.MoveNext())
           {
            en.c=e.get_Current();
            return true;
           }
          else
           {
            en.s={
             $:0
            };
            return next(en);
           }
         }
        else
         {
          if(f(null))
           {
            en.s={
             $:1,
             $0:Enumerator.Get(s)
            };
            return next(en);
           }
          else
           {
            return false;
           }
         }
       };
       return T.New({
        $:0
       },null,next);
      });
     },
     exists:function(p,s)
     {
      var e,r;
      e=Enumerator.Get(s);
      r=false;
      while(!r?e.MoveNext():false)
       {
        r=p(e.get_Current());
       }
      return r;
     },
     exists2:function(p,s1,s2)
     {
      var e1,e2,r;
      e1=Enumerator.Get(s1);
      e2=Enumerator.Get(s2);
      r=false;
      while((!r?e1.MoveNext():false)?e2.MoveNext():false)
       {
        r=(p(e1.get_Current()))(e2.get_Current());
       }
      return r;
     },
     filter:function(f,s)
     {
      return Enumerable.Of(function()
      {
       var _enum;
       _enum=Enumerator.Get(s);
       return T.New(null,null,function(e)
       {
        var loop,c,res;
        loop=_enum.MoveNext();
        c=_enum.get_Current();
        res=false;
        while(loop)
         {
          if(f(c))
           {
            e.c=c;
            res=true;
            loop=false;
           }
          else
           {
            if(_enum.MoveNext())
             {
              c=_enum.get_Current();
             }
            else
             {
              loop=false;
             }
           }
         }
        return res;
       });
      });
     },
     find:function(p,s)
     {
      var matchValue;
      matchValue=Seq.tryFind(p,s);
      return matchValue.$==0?Operators.FailWith("KeyNotFoundException"):matchValue.$0;
     },
     findIndex:function(p,s)
     {
      var matchValue;
      matchValue=Seq.tryFindIndex(p,s);
      return matchValue.$==0?Operators.FailWith("KeyNotFoundException"):matchValue.$0;
     },
     fold:function(f,x,s)
     {
      var r,e;
      r=x;
      e=Enumerator.Get(s);
      while(e.MoveNext())
       {
        r=(f(r))(e.get_Current());
       }
      return r;
     },
     forall:function(p,s)
     {
      return!Seq.exists(function(x)
      {
       return!p(x);
      },s);
     },
     forall2:function(p,s1,s2)
     {
      return!Seq.exists2(function(x)
      {
       return function(y)
       {
        return!(p(x))(y);
       };
      },s1,s2);
     },
     groupBy:function(f,s)
     {
      return Seq.delay(function()
      {
       var d,d1,keys,e,c,k,h;
       d={};
       d1={};
       keys=[];
       e=Enumerator.Get(s);
       while(e.MoveNext())
        {
         c=e.get_Current();
         k=f(c);
         h=Unchecked.Hash(k);
         if(!d.hasOwnProperty(h))
          {
           keys.push(k);
          }
         d1[h]=k;
         if(d.hasOwnProperty(h))
          {
           d[h].push(c);
          }
         else
          {
           d[h]=[c];
          }
        }
       return Arrays.map(function(k1)
       {
        return[k1,d[Unchecked.Hash(k1)]];
       },keys);
      });
     },
     head:function(s)
     {
      var e;
      e=Enumerator.Get(s);
      return e.MoveNext()?e.get_Current():Seq.insufficient();
     },
     init:function(n,f)
     {
      return Seq.take(n,Seq.initInfinite(f));
     },
     initInfinite:function(f)
     {
      return Enumerable.Of(function()
      {
       return T.New(0,null,function(e)
       {
        e.c=f(e.s);
        e.s=e.s+1;
        return true;
       });
      });
     },
     insufficient:function()
     {
      return Operators.FailWith("The input sequence has an insufficient number of elements.");
     },
     isEmpty:function(s)
     {
      return!Enumerator.Get(s).MoveNext();
     },
     iter:function(p,s)
     {
      return Seq.iteri(function()
      {
       return function(x)
       {
        return p(x);
       };
      },s);
     },
     iter2:function(p,s1,s2)
     {
      var e1,e2;
      e1=Enumerator.Get(s1);
      e2=Enumerator.Get(s2);
      while(e1.MoveNext()?e2.MoveNext():false)
       {
        (p(e1.get_Current()))(e2.get_Current());
       }
      return;
     },
     iteri:function(p,s)
     {
      var i,e;
      i=0;
      e=Enumerator.Get(s);
      while(e.MoveNext())
       {
        (p(i))(e.get_Current());
        i=i+1;
       }
      return;
     },
     length:function(s)
     {
      var i,e;
      i=0;
      e=Enumerator.Get(s);
      while(e.MoveNext())
       {
        i=i+1;
       }
      return i;
     },
     map:function(f,s)
     {
      return Enumerable.Of(function()
      {
       var en;
       en=Enumerator.Get(s);
       return T.New(null,null,function(e)
       {
        if(en.MoveNext())
         {
          e.c=f(en.get_Current());
          return true;
         }
        else
         {
          return false;
         }
       });
      });
     },
     mapi:function(f,s)
     {
      return Seq.mapi2(f,Seq.initInfinite(function(x)
      {
       return x;
      }),s);
     },
     mapi2:function(f,s1,s2)
     {
      return Enumerable.Of(function()
      {
       var e1,e2;
       e1=Enumerator.Get(s1);
       e2=Enumerator.Get(s2);
       return T.New(null,null,function(e)
       {
        if(e1.MoveNext()?e2.MoveNext():false)
         {
          e.c=(f(e1.get_Current()))(e2.get_Current());
          return true;
         }
        else
         {
          return false;
         }
       });
      });
     },
     max:function(s)
     {
      return Seq.reduce(function(x)
      {
       return function(y)
       {
        return Unchecked.Compare(x,y)>=0?x:y;
       };
      },s);
     },
     maxBy:function(f,s)
     {
      return Seq.reduce(function(x)
      {
       return function(y)
       {
        return Unchecked.Compare(f(x),f(y))>=0?x:y;
       };
      },s);
     },
     min:function(s)
     {
      return Seq.reduce(function(x)
      {
       return function(y)
       {
        return Unchecked.Compare(x,y)<=0?x:y;
       };
      },s);
     },
     minBy:function(f,s)
     {
      return Seq.reduce(function(x)
      {
       return function(y)
       {
        return Unchecked.Compare(f(x),f(y))<=0?x:y;
       };
      },s);
     },
     nth:function(index,s)
     {
      var pos,e;
      if(index<0)
       {
        Operators.FailWith("negative index requested");
       }
      pos=-1;
      e=Enumerator.Get(s);
      while(pos<index)
       {
        if(!e.MoveNext())
         {
          Seq.insufficient();
         }
        pos=pos+1;
       }
      return e.get_Current();
     },
     pairwise:function(s)
     {
      return Seq.map(function(x)
      {
       return[x[0],x[1]];
      },Seq.windowed(2,s));
     },
     pick:function(p,s)
     {
      var matchValue;
      matchValue=Seq.tryPick(p,s);
      return matchValue.$==0?Operators.FailWith("KeyNotFoundException"):matchValue.$0;
     },
     readOnly:function(s)
     {
      return Enumerable.Of(function()
      {
       return Enumerator.Get(s);
      });
     },
     reduce:function(f,source)
     {
      var e,r;
      e=Enumerator.Get(source);
      if(!e.MoveNext())
       {
        Operators.FailWith("The input sequence was empty");
       }
      r=e.get_Current();
      while(e.MoveNext())
       {
        r=(f(r))(e.get_Current());
       }
      return r;
     },
     scan:function(f,x,s)
     {
      return Enumerable.Of(function()
      {
       var en;
       en=Enumerator.Get(s);
       return T.New(false,null,function(e)
       {
        if(e.s)
         {
          if(en.MoveNext())
           {
            e.c=(f(e.get_Current()))(en.get_Current());
            return true;
           }
          else
           {
            return false;
           }
         }
        else
         {
          e.c=x;
          e.s=true;
          return true;
         }
       });
      });
     },
     skip:function(n,s)
     {
      return Enumerable.Of(function()
      {
       var e,i;
       e=Enumerator.Get(s);
       for(i=1;i<=n;i++){
        if(!e.MoveNext())
         {
          Seq.insufficient();
         }
       }
       return e;
      });
     },
     skipWhile:function(f,s)
     {
      return Enumerable.Of(function()
      {
       var e,empty;
       e=Enumerator.Get(s);
       empty=true;
       while(e.MoveNext()?f(e.get_Current()):false)
        {
         empty=false;
        }
       return empty?Enumerator.Get(Seq.empty()):T.New(true,null,function(x)
       {
        var r;
        if(x.s)
         {
          x.s=false;
          x.c=e.get_Current();
          return true;
         }
        else
         {
          r=e.MoveNext();
          x.c=e.get_Current();
          return r;
         }
       });
      });
     },
     sort:function(s)
     {
      return Seq.sortBy(function(x)
      {
       return x;
      },s);
     },
     sortBy:function(f,s)
     {
      return Seq.delay(function()
      {
       var array;
       array=Arrays.ofSeq(s);
       Arrays.sortInPlaceBy(f,array);
       return array;
      });
     },
     sum:function(s)
     {
      return Seq.fold(function(s1)
      {
       return function(x)
       {
        return s1+x;
       };
      },0,s);
     },
     sumBy:function(f,s)
     {
      return Seq.fold(function(s1)
      {
       return function(x)
       {
        return s1+f(x);
       };
      },0,s);
     },
     take:function(n,s)
     {
      return Enumerable.Of(function()
      {
       var e;
       e=Enumerator.Get(s);
       return T.New(0,null,function(_enum)
       {
        if(_enum.s>=n)
         {
          return false;
         }
        else
         {
          if(e.MoveNext())
           {
            _enum.s=_enum.s+1;
            _enum.c=e.get_Current();
            return true;
           }
          else
           {
            e.Dispose();
            _enum.s=n;
            return false;
           }
         }
       });
      });
     },
     takeWhile:function(f,s)
     {
      return Seq.delay(function()
      {
       return Seq.enumUsing(Enumerator.Get(s),function(e)
       {
        return Seq.enumWhile(function()
        {
         return e.MoveNext()?f(e.get_Current()):false;
        },Seq.delay(function()
        {
         return[e.get_Current()];
        }));
       });
      });
     },
     toArray:function(s)
     {
      var q,enumerator;
      q=[];
      enumerator=Enumerator.Get(s);
      while(enumerator.MoveNext())
       {
        q.push(enumerator.get_Current());
       }
      return q.slice(0);
     },
     toList:function(s)
     {
      return List.ofSeq(s);
     },
     truncate:function(n,s)
     {
      return Seq.delay(function()
      {
       return Seq.enumUsing(Enumerator.Get(s),function(e)
       {
        var i;
        i={
         contents:0
        };
        return Seq.enumWhile(function()
        {
         return e.MoveNext()?i.contents<n:false;
        },Seq.delay(function()
        {
         Operators.Increment(i);
         return[e.get_Current()];
        }));
       });
      });
     },
     tryFind:function(ok,s)
     {
      var e,r,x;
      e=Enumerator.Get(s);
      r={
       $:0
      };
      while(r.$==0?e.MoveNext():false)
       {
        x=e.get_Current();
        if(ok(x))
         {
          r={
           $:1,
           $0:x
          };
         }
       }
      return r;
     },
     tryFindIndex:function(ok,s)
     {
      var e,loop,i;
      e=Enumerator.Get(s);
      loop=true;
      i=0;
      while(loop?e.MoveNext():false)
       {
        if(ok(e.get_Current()))
         {
          loop=false;
         }
        else
         {
          i=i+1;
         }
       }
      return loop?{
       $:0
      }:{
       $:1,
       $0:i
      };
     },
     tryPick:function(f,s)
     {
      var e,r;
      e=Enumerator.Get(s);
      r={
       $:0
      };
      while(Unchecked.Equals(r,{
       $:0
      })?e.MoveNext():false)
       {
        r=f(e.get_Current());
       }
      return r;
     },
     unfold:function(f,s)
     {
      return Enumerable.Of(function()
      {
       return T.New(s,null,function(e)
       {
        var matchValue,s1;
        matchValue=f(e.s);
        if(matchValue.$==0)
         {
          return false;
         }
        else
         {
          s1=matchValue.$0[1];
          e.c=matchValue.$0[0];
          e.s=s1;
          return true;
         }
       });
      });
     },
     windowed:function(windowSize,s)
     {
      if(windowSize<=0)
       {
        Operators.FailWith("The input must be non-negative.");
       }
      return Seq.delay(function()
      {
       return Seq.enumUsing(Enumerator.Get(s),function(e)
       {
        var q;
        q=[];
        return Seq.append(Seq.enumWhile(function()
        {
         return q.length<windowSize?e.MoveNext():false;
        },Seq.delay(function()
        {
         q.push(e.get_Current());
         return Seq.empty();
        })),Seq.delay(function()
        {
         return q.length===windowSize?Seq.append([q.slice(0)],Seq.delay(function()
         {
          return Seq.enumWhile(function()
          {
           return e.MoveNext();
          },Seq.delay(function()
          {
           q.shift();
           q.push(e.get_Current());
           return[q.slice(0)];
          }));
         })):Seq.empty();
        }));
       });
      });
     },
     zip:function(s1,s2)
     {
      return Seq.mapi2(function(x)
      {
       return function(y)
       {
        return[x,y];
       };
      },s1,s2);
     },
     zip3:function(s1,s2,s3)
     {
      return Seq.mapi2(function(x)
      {
       return Runtime.Tupled(function(tupledArg)
       {
        return[x,tupledArg[0],tupledArg[1]];
       });
      },s1,Seq.zip(s2,s3));
     }
    },
    Stack:{
     Clear:function(stack)
     {
      return stack.splice(0,IntrinsicFunctionProxy.GetLength(stack));
     },
     Contains:function(stack,el)
     {
      return Seq.exists(function(y)
      {
       return Unchecked.Equals(el,y);
      },stack);
     },
     CopyTo:function(stack,array,index)
     {
      return Arrays.blit(array,0,array,index,IntrinsicFunctionProxy.GetLength(stack));
     }
    },
    Strings:{
     Compare:function(x,y)
     {
      return Operators.Compare(x,y);
     },
     CopyTo:function(s,o,d,off,ct)
     {
      return Arrays.blit(Strings.ToCharArray(s),o,d,off,ct);
     },
     EndsWith:function($x,$s)
     {
      var $0=this,$this=this;
      return $x.substring($x.length-$s.length)==$s;
     },
     IndexOf:function($s,$c,$i)
     {
      var $0=this,$this=this;
      return $s.indexOf(Global.String.fromCharCode($c),$i);
     },
     Insert:function($x,$index,$s)
     {
      var $0=this,$this=this;
      return $x.substring(0,$index-1)+$s+$x.substring($index);
     },
     IsNullOrEmpty:function($x)
     {
      var $0=this,$this=this;
      return $x==null||$x=="";
     },
     Join:function($sep,$values)
     {
      var $0=this,$this=this;
      return $values.join($sep);
     },
     LastIndexOf:function($s,$c,$i)
     {
      var $0=this,$this=this;
      return $s.lastIndexOf(Global.String.fromCharCode($c),$i);
     },
     PadLeft:function(s,n)
     {
      return Array(n-s.length+1).join(String.fromCharCode(32))+s;
     },
     PadRight:function(s,n)
     {
      return s+Array(n-s.length+1).join(String.fromCharCode(32));
     },
     RegexEscape:function($s)
     {
      var $0=this,$this=this;
      return $s.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&");
     },
     Remove:function($x,$ix,$ct)
     {
      var $0=this,$this=this;
      return $x.substring(0,$ix)+$x.substring($ix+$ct);
     },
     Replace:function(subject,search,replace)
     {
      var loop,matchValue;
      loop=[];
      loop[1]=subject;
      loop[0]=1;
      while(loop[0])
       {
        matchValue=Strings.ReplaceOnce(loop[1],search,replace);
        if(matchValue===loop[1])
         {
          loop[0]=0;
          loop[1]=matchValue;
         }
        else
         {
          loop[1]=matchValue;
          loop[0]=1;
         }
       }
      return loop[1];
     },
     ReplaceChar:function(s,oldC,newC)
     {
      return Strings.Replace(s,String.fromCharCode(oldC),String.fromCharCode(newC));
     },
     ReplaceOnce:function($string,$search,$replace)
     {
      var $0=this,$this=this;
      return $string.replace($search,$replace);
     },
     Split:function(s,pat,opts)
     {
      var res;
      res=Strings.SplitWith(s,pat);
      return opts===1?Arrays.filter(function(x)
      {
       return x!=="";
      },res):res;
     },
     SplitChars:function(s,sep,opts)
     {
      return Strings.Split(s,new RegExp("["+Strings.RegexEscape(String.fromCharCode.apply(undefined,sep))+"]"),opts);
     },
     SplitStrings:function(s,sep,opts)
     {
      return Strings.Split(s,new RegExp(Strings.concat("|",Arrays.map(function(s1)
      {
       return Strings.RegexEscape(s1);
      },sep))),opts);
     },
     SplitWith:function($str,$pat)
     {
      var $0=this,$this=this;
      return $str.split($pat);
     },
     StartsWith:function($t,$s)
     {
      var $0=this,$this=this;
      return $t.substring(0,$s.length)==$s;
     },
     Substring:function($s,$ix,$ct)
     {
      var $0=this,$this=this;
      return $s.substr($ix,$ct);
     },
     ToCharArray:function(s)
     {
      return Arrays.init(s.length,function(x)
      {
       return s.charCodeAt(x);
      });
     },
     ToCharArrayRange:function(s,startIndex,length)
     {
      return Arrays.init(length,function(i)
      {
       return s.charCodeAt(startIndex+i);
      });
     },
     Trim:function($s)
     {
      var $0=this,$this=this;
      return $s.replace(/^\s+/,"").replace(/\s+$/,"");
     },
     collect:function(f,s)
     {
      return Arrays.init(s.length,function(i)
      {
       return f(s.charCodeAt(i));
      }).join("");
     },
     concat:function(separator,strings)
     {
      return Seq.toArray(strings).join(separator);
     },
     exists:function(f,s)
     {
      return Seq.exists(f,Strings.protect(s));
     },
     forall:function(f,s)
     {
      return Seq.forall(f,Strings.protect(s));
     },
     init:function(count,f)
     {
      return Arrays.init(count,f).join("");
     },
     iter:function(f,s)
     {
      return Seq.iter(f,Strings.protect(s));
     },
     iteri:function(f,s)
     {
      return Seq.iteri(f,Strings.protect(s));
     },
     length:function(s)
     {
      return Strings.protect(s).length;
     },
     map:function(f,s)
     {
      return Strings.collect(function(x)
      {
       return String.fromCharCode(f(x));
      },Strings.protect(s));
     },
     mapi:function(f,s)
     {
      return Seq.toArray(Seq.mapi(function(i)
      {
       return function(x)
       {
        return String.fromCharCode((f(i))(x));
       };
      },s)).join("");
     },
     protect:function(s)
     {
      return s===null?"":s;
     },
     replicate:function(count,s)
     {
      return Strings.init(count,function()
      {
       return s;
      });
     }
    },
    Unchecked:{
     Compare:function(a,b)
     {
      var matchValue;
      if(a===b)
       {
        return 0;
       }
      else
       {
        matchValue=typeof a;
        return matchValue==="undefined"?typeof b==="undefined"?0:-1:matchValue==="function"?Operators.FailWith("Cannot compare function values."):matchValue==="boolean"?a<b?-1:1:matchValue==="number"?a<b?-1:1:matchValue==="string"?a<b?-1:1:a===null?-1:b===null?1:"CompareTo"in a?a.CompareTo(b):(a instanceof Array?b instanceof Array:false)?Unchecked.compareArrays(a,b):(a instanceof Date?b instanceof Date:false)?Unchecked.compareDates(a,b):Unchecked.compareArrays(JavaScript.GetFields(a),JavaScript.GetFields(b));
       }
     },
     Equals:function(a,b)
     {
      return a===b?true:typeof a==="object"?a===null?false:b===null?false:"Equals"in a?a.Equals(b):(a instanceof Array?b instanceof Array:false)?Unchecked.arrayEquals(a,b):(a instanceof Date?b instanceof Date:false)?Unchecked.dateEquals(a,b):Unchecked.arrayEquals(JavaScript.GetFields(a),JavaScript.GetFields(b)):false;
     },
     Hash:function(o)
     {
      var matchValue;
      matchValue=typeof o;
      return matchValue==="function"?0:matchValue==="boolean"?o?1:0:matchValue==="number"?o:matchValue==="string"?Unchecked.hashString(o):matchValue==="object"?o==null?0:o instanceof Array?Unchecked.hashArray(o):Unchecked.hashObject(o):0;
     },
     arrayEquals:function(a,b)
     {
      var eq,i;
      if(IntrinsicFunctionProxy.GetLength(a)===IntrinsicFunctionProxy.GetLength(b))
       {
        eq=true;
        i=0;
        while(eq?i<IntrinsicFunctionProxy.GetLength(a):false)
         {
          if(!Unchecked.Equals(a[i],b[i]))
           {
            eq=false;
           }
          i=i+1;
         }
        return eq;
       }
      else
       {
        return false;
       }
     },
     compareArrays:function(a,b)
     {
      var cmp,i;
      if(IntrinsicFunctionProxy.GetLength(a)<IntrinsicFunctionProxy.GetLength(b))
       {
        return-1;
       }
      else
       {
        if(IntrinsicFunctionProxy.GetLength(a)>IntrinsicFunctionProxy.GetLength(b))
         {
          return 1;
         }
        else
         {
          cmp=0;
          i=0;
          while(cmp===0?i<IntrinsicFunctionProxy.GetLength(a):false)
           {
            cmp=Unchecked.Compare(a[i],b[i]);
            i=i+1;
           }
          return cmp;
         }
       }
     },
     compareDates:function(a,b)
     {
      return Operators.Compare(a.getTime(),b.getTime());
     },
     dateEquals:function(a,b)
     {
      return a.getTime()===b.getTime();
     },
     hashArray:function(o)
     {
      var h,i;
      h=-34948909;
      for(i=0;i<=IntrinsicFunctionProxy.GetLength(o)-1;i++){
       h=Unchecked.hashMix(h,Unchecked.Hash(o[i]));
      }
      return h;
     },
     hashMix:function(x,y)
     {
      return(x<<5)+x+y;
     },
     hashObject:function(o)
     {
      var op_PlusPlus,h;
      if("GetHashCode"in o)
       {
        return o.GetHashCode();
       }
      else
       {
        op_PlusPlus=function(x,y)
        {
         return Unchecked.hashMix(x,y);
        };
        h={
         contents:0
        };
        JavaScript.ForEach(o,function(key)
        {
         h.contents=op_PlusPlus(op_PlusPlus(h.contents,Unchecked.hashString(key)),Unchecked.Hash(o[key]));
         return false;
        });
        return h.contents;
       }
     },
     hashString:function(s)
     {
      var hash,i;
      if(s===null)
       {
        return 0;
       }
      else
       {
        hash=5381;
        for(i=0;i<=s.length-1;i++){
         hash=Unchecked.hashMix(hash,s.charCodeAt(i)<<0);
        }
        return hash;
       }
     }
    },
    Util:{
     addListener:function(event,h)
     {
      event.Subscribe(Util.observer(h));
     },
     observer:function(h)
     {
      return{
       OnCompleted:function()
       {
       },
       OnError:function()
       {
       },
       OnNext:h
      };
     },
     subscribeTo:function(event,h)
     {
      return event.Subscribe(Util.observer(h));
     }
    }
   }
  }
 });
 Runtime.OnInit(function()
 {
  WebSharper=Runtime.Safe(Global.IntelliFactory.WebSharper);
  Arrays=Runtime.Safe(WebSharper.Arrays);
  Operators=Runtime.Safe(WebSharper.Operators);
  Number=Runtime.Safe(Global.Number);
  IntrinsicFunctionProxy=Runtime.Safe(WebSharper.IntrinsicFunctionProxy);
  Array=Runtime.Safe(Global.Array);
  Seq=Runtime.Safe(WebSharper.Seq);
  Unchecked=Runtime.Safe(WebSharper.Unchecked);
  Enumerator=Runtime.Safe(WebSharper.Enumerator);
  Arrays2D=Runtime.Safe(WebSharper.Arrays2D);
  Char=Runtime.Safe(WebSharper.Char);
  Util=Runtime.Safe(WebSharper.Util);
  Concurrency=Runtime.Safe(WebSharper.Concurrency);
  setTimeout=Runtime.Safe(Global.setTimeout);
  Date=Runtime.Safe(Global.Date);
  JavaScript=Runtime.Safe(WebSharper.JavaScript);
  Scheduler=Runtime.Safe(Concurrency.Scheduler);
  T=Runtime.Safe(Enumerator.T);
  Json=Runtime.Safe(WebSharper.Json);
  List=Runtime.Safe(WebSharper.List);
  T1=Runtime.Safe(List.T);
  Error=Runtime.Safe(Global.Error);
  Math=Runtime.Safe(Global.Math);
  Remoting=Runtime.Safe(WebSharper.Remoting);
  XhrProvider=Runtime.Safe(Remoting.XhrProvider);
  JSON=Runtime.Safe(Global.JSON);
  Enumerable=Runtime.Safe(WebSharper.Enumerable);
  Strings=Runtime.Safe(WebSharper.Strings);
  String=Runtime.Safe(Global.String);
  return RegExp=Runtime.Safe(Global.RegExp);
 });
 Runtime.OnLoad(function()
 {
  Remoting.EndPoint();
  Remoting.AjaxProvider();
  Concurrency.scheduler();
  return;
 });
}());

var JSON;JSON||(JSON={}),function(){"use strict";function i(n){return n<10?"0"+n:n}function f(n){return o.lastIndex=0,o.test(n)?'"'+n.replace(o,function(n){var t=s[n];return typeof t=="string"?t:"\\u"+("0000"+n.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+n+'"'}function r(i,e){var s,l,h,a,v=n,c,o=e[i];o&&typeof o=="object"&&typeof o.toJSON=="function"&&(o=o.toJSON(i)),typeof t=="function"&&(o=t.call(e,i,o));switch(typeof o){case"string":return f(o);case"number":return isFinite(o)?String(o):"null";case"boolean":case"null":return String(o);case"object":if(!o)return"null";if(n+=u,c=[],Object.prototype.toString.apply(o)==="[object Array]"){for(a=o.length,s=0;s<a;s+=1)c[s]=r(s,o)||"null";return h=c.length===0?"[]":n?"[\n"+n+c.join(",\n"+n)+"\n"+v+"]":"["+c.join(",")+"]",n=v,h}if(t&&typeof t=="object")for(a=t.length,s=0;s<a;s+=1)typeof t[s]=="string"&&(l=t[s],h=r(l,o),h&&c.push(f(l)+(n?": ":":")+h));else for(l in o)Object.prototype.hasOwnProperty.call(o,l)&&(h=r(l,o),h&&c.push(f(l)+(n?": ":":")+h));return h=c.length===0?"{}":n?"{\n"+n+c.join(",\n"+n)+"\n"+v+"}":"{"+c.join(",")+"}",n=v,h}}typeof Date.prototype.toJSON!="function"&&(Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+i(this.getUTCMonth()+1)+"-"+i(this.getUTCDate())+"T"+i(this.getUTCHours())+":"+i(this.getUTCMinutes())+":"+i(this.getUTCSeconds())+"Z":null},String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(){return this.valueOf()});var e=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,o=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,n,u,s={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},t;typeof JSON.stringify!="function"&&(JSON.stringify=function(i,f,e){var o;if(n="",u="",typeof e=="number")for(o=0;o<e;o+=1)u+=" ";else typeof e=="string"&&(u=e);if(t=f,f&&typeof f!="function"&&(typeof f!="object"||typeof f.length!="number"))throw new Error("JSON.stringify");return r("",{"":i})}),typeof JSON.parse!="function"&&(JSON.parse=function(n,t){function r(n,i){var f,e,u=n[i];if(u&&typeof u=="object")for(f in u)Object.prototype.hasOwnProperty.call(u,f)&&(e=r(u,f),e!==undefined?u[f]=e:delete u[f]);return t.call(n,i,u)}var i;if(n=String(n),e.lastIndex=0,e.test(n)&&(n=n.replace(e,function(n){return"\\u"+("0000"+n.charCodeAt(0).toString(16)).slice(-4)})),/^[\],:{}\s]*$/.test(n.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return i=eval("("+n+")"),typeof t=="function"?r({"":i},""):i;throw new SyntaxError("JSON.parse");})}();;
(function()
{
 var Global=this,Runtime=this.IntelliFactory.Runtime,WebSharper,Html,Activator,document,Default,JavaScript,Json,JSON,Arrays,Attribute,Implementation,HTML5,Element,Enumerator,Math,jQuery,Events,JQueryEventSupport,AttributeBuilder,DeprecatedTagBuilder,Html5AttributeBuilder,JQueryHtmlProvider,Html5TagBuilder,TagBuilder,Text,HTML51,EventsPervasives;
 Runtime.Define(Global,{
  IntelliFactory:{
   WebSharper:{
    Html:{
     Activator:{
      Activate:Runtime.Field(function()
      {
       var meta;
       if(Activator.hasDocument())
        {
         meta=document.getElementById("websharper-data");
         return meta?Default.OnLoad(function()
         {
          var array;
          array=JavaScript.GetFields(Json.Activate(JSON.parse(meta.getAttribute("content"))));
          return Arrays.iter(Runtime.Tupled(function(tupledArg)
          {
           var k,p,old;
           k=tupledArg[0];
           p=tupledArg[1].get_Body();
           old=document.getElementById(k);
           old.parentNode.replaceChild(p.get_Body(),old);
           return p.Render();
          }),array);
         }):null;
        }
       else
        {
         return null;
        }
      }),
      hasDocument:function()
      {
       var $0=this,$this=this;
       return typeof Global.document!=="undefined";
      }
     },
     Attribute:Runtime.Class({
      Render:function()
      {
       return null;
      },
      get_Body:function()
      {
       var attr;
       attr=this.HtmlProvider.CreateAttribute(this.Name);
       attr.nodeValue=this.Value;
       return attr;
      }
     },{
      New:function(htmlProvider,name,value)
      {
       var a;
       a=Attribute.New1(htmlProvider);
       a.Name=name;
       a.Value=value;
       return a;
      },
      New1:function(HtmlProvider)
      {
       var r;
       r=Runtime.New(this,{});
       r.HtmlProvider=HtmlProvider;
       return r;
      }
     }),
     AttributeBuilder:Runtime.Class({
      Class:function(x)
      {
       return this.NewAttr("class",x);
      },
      NewAttr:function(name,value)
      {
       return Attribute.New(this.HtmlProvider,name,value);
      },
      get_CheckBox:function()
      {
       return this.NewAttr("type","checkbox");
      },
      get_Hidden:function()
      {
       return this.NewAttr("type","hidden");
      },
      get_Password:function()
      {
       return this.NewAttr("type","password");
      },
      get_Radio:function()
      {
       return this.NewAttr("type","radio");
      },
      get_Reset:function()
      {
       return this.NewAttr("type","reset");
      },
      get_Submit:function()
      {
       return this.NewAttr("type","submit");
      },
      get_TextField:function()
      {
       return this.NewAttr("type","textfield");
      }
     },{
      New:function(HtmlProvider)
      {
       var r;
       r=Runtime.New(this,{});
       r.HtmlProvider=HtmlProvider;
       return r;
      }
     }),
     Default:{
      A:function(x)
      {
       return Default.Tags().NewTag("a",x);
      },
      Action:function(x)
      {
       return Default.Attr().NewAttr("action",x);
      },
      Align:function(x)
      {
       return Default.Attr().NewAttr("align",x);
      },
      Alt:function(x)
      {
       return Default.Attr().NewAttr("alt",x);
      },
      Attr:Runtime.Field(function()
      {
       return Implementation.Attr();
      }),
      B:function(x)
      {
       return Default.Tags().NewTag("b",x);
      },
      Body:function(x)
      {
       return Default.Tags().NewTag("body",x);
      },
      Br:function(x)
      {
       return Default.Tags().NewTag("br",x);
      },
      Button:function(x)
      {
       return Default.Tags().NewTag("button",x);
      },
      Code:function(x)
      {
       return Default.Tags().NewTag("code",x);
      },
      Deprecated:Runtime.Field(function()
      {
       return Implementation.DeprecatedHtml();
      }),
      Div:function(x)
      {
       return Default.Tags().Div(x);
      },
      Em:function(x)
      {
       return Default.Tags().NewTag("em",x);
      },
      Form:function(x)
      {
       return Default.Tags().NewTag("form",x);
      },
      H1:function(x)
      {
       return Default.Tags().NewTag("h1",x);
      },
      H2:function(x)
      {
       return Default.Tags().NewTag("h2",x);
      },
      H3:function(x)
      {
       return Default.Tags().NewTag("h3",x);
      },
      H4:function(x)
      {
       return Default.Tags().NewTag("h4",x);
      },
      HRef:function(x)
      {
       return Default.Attr().NewAttr("href",x);
      },
      HTML5:{
       Attr:Runtime.Field(function()
       {
        return HTML5.Attr();
       }),
       Tags:Runtime.Field(function()
       {
        return HTML5.Tags();
       })
      },
      Head:function(x)
      {
       return Default.Tags().NewTag("head",x);
      },
      Height:function(x)
      {
       return Default.Attr().NewAttr("height",x);
      },
      Hr:function(x)
      {
       return Default.Tags().NewTag("hr",x);
      },
      I:function(x)
      {
       return Default.Tags().NewTag("i",x);
      },
      IFrame:function(x)
      {
       return Default.Tags().NewTag("iframe",x);
      },
      Id:function(x)
      {
       return Default.Attr().NewAttr("id",x);
      },
      Img:function(x)
      {
       return Default.Tags().NewTag("img",x);
      },
      Input:function(x)
      {
       return Default.Tags().NewTag("input",x);
      },
      LI:function(x)
      {
       return Default.Tags().NewTag("li",x);
      },
      Name:function(x)
      {
       return Default.Attr().NewAttr("name",x);
      },
      NewAttr:function(x)
      {
       return function(arg10)
       {
        return Default.Attr().NewAttr(x,arg10);
       };
      },
      OL:function(x)
      {
       return Default.Tags().NewTag("ol",x);
      },
      OnLoad:function(init)
      {
       return Implementation.HtmlProvider().OnDocumentReady(init);
      },
      P:function(x)
      {
       return Default.Tags().NewTag("p",x);
      },
      Pre:function(x)
      {
       return Default.Tags().NewTag("pre",x);
      },
      RowSpan:function(x)
      {
       return Default.Attr().NewAttr("rowspan",x);
      },
      Script:function(x)
      {
       return Default.Tags().NewTag("script",x);
      },
      Select:function(x)
      {
       return Default.Tags().NewTag("select",x);
      },
      Selected:function(x)
      {
       return Default.Attr().NewAttr("selected",x);
      },
      Span:function(x)
      {
       return Default.Tags().NewTag("span",x);
      },
      Src:function(x)
      {
       return Default.Attr().NewAttr("src",x);
      },
      TBody:function(x)
      {
       return Default.Tags().NewTag("tbody",x);
      },
      TD:function(x)
      {
       return Default.Tags().NewTag("td",x);
      },
      TFoot:function(x)
      {
       return Default.Tags().NewTag("tfoot",x);
      },
      TH:function(x)
      {
       return Default.Tags().NewTag("th",x);
      },
      THead:function(x)
      {
       return Default.Tags().NewTag("thead",x);
      },
      TR:function(x)
      {
       return Default.Tags().NewTag("tr",x);
      },
      Table:function(x)
      {
       return Default.Tags().NewTag("table",x);
      },
      Tags:Runtime.Field(function()
      {
       return Implementation.Tags();
      }),
      Text:function(x)
      {
       return Default.Tags().text(x);
      },
      TextArea:function(x)
      {
       return Default.Tags().NewTag("textarea",x);
      },
      UL:function(x)
      {
       return Default.Tags().NewTag("ul",x);
      },
      VAlign:function(x)
      {
       return Default.Attr().NewAttr("valign",x);
      },
      Width:function(x)
      {
       return Default.Attr().NewAttr("width",x);
      }
     },
     DeprecatedAttributeBuilder:Runtime.Class({
      NewAttr:function(name,value)
      {
       return Attribute.New(this.HtmlProvider,name,value);
      }
     },{
      New:function(HtmlProvider)
      {
       var r;
       r=Runtime.New(this,{});
       r.HtmlProvider=HtmlProvider;
       return r;
      }
     }),
     DeprecatedTagBuilder:Runtime.Class({
      NewTag:function(name,children)
      {
       var el,enumerator;
       el=Element.New(this.HtmlProvider,name);
       enumerator=Enumerator.Get(children);
       while(enumerator.MoveNext())
        {
         el.AppendI(enumerator.get_Current());
        }
       return el;
      }
     },{
      New:function(HtmlProvider)
      {
       var r;
       r=Runtime.New(this,{});
       r.HtmlProvider=HtmlProvider;
       return r;
      }
     }),
     Element:Runtime.Class({
      AppendI:function(pl)
      {
       var body,r;
       body=pl.get_Body();
       if(body.nodeType===2)
        {
         this["HtmlProvider@32"].AppendAttribute(this.Body,body);
        }
       else
        {
         this["HtmlProvider@32"].AppendNode(this.Body,pl.get_Body());
        }
       if(this.IsRendered)
        {
         return pl.Render();
        }
       else
        {
         r=this.RenderInternal;
         this.RenderInternal=function()
         {
          r(null);
          return pl.Render();
         };
         return;
        }
      },
      AppendN:function(node)
      {
       return this["HtmlProvider@32"].AppendNode(this.Body,node);
      },
      OnLoad:function(f)
      {
       return this["HtmlProvider@32"].OnLoad(this.Body,f);
      },
      Render:function()
      {
       if(!this.IsRendered)
        {
         this.RenderInternal.call(null,null);
         this.IsRendered=true;
         return;
        }
       else
        {
         return null;
        }
      },
      get_Body:function()
      {
       return this.Body;
      },
      get_Html:function()
      {
       return this["HtmlProvider@32"].GetHtml(this.Body);
      },
      get_HtmlProvider:function()
      {
       return this["HtmlProvider@32"];
      },
      get_Id:function()
      {
       var id,newId;
       id=this["HtmlProvider@32"].GetProperty(this.Body,"id");
       if(id===undefined?true:id==="")
        {
         newId="id"+Math.round(Math.random()*100000000);
         this["HtmlProvider@32"].SetProperty(this.Body,"id",newId);
         return newId;
        }
       else
        {
         return id;
        }
      },
      get_Item:function(name)
      {
       this["HtmlProvider@32"].GetAttribute(this.Body,name);
       return this["HtmlProvider@32"].GetAttribute(this.Body,name);
      },
      get_Text:function()
      {
       return this["HtmlProvider@32"].GetText(this.Body);
      },
      get_Value:function()
      {
       return this["HtmlProvider@32"].GetValue(this.Body);
      },
      set_Html:function(x)
      {
       return this["HtmlProvider@32"].SetHtml(this.Body,x);
      },
      set_Item:function(name,value)
      {
       return this["HtmlProvider@32"].SetAttribute(this.Body,name,value);
      },
      set_Text:function(x)
      {
       return this["HtmlProvider@32"].SetText(this.Body,x);
      },
      set_Value:function(x)
      {
       return this["HtmlProvider@32"].SetValue(this.Body,x);
      }
     },{
      New:function(html,name)
      {
       var el,dom;
       el=Element.New1(html);
       dom=document.createElement(name);
       el.RenderInternal=function()
       {
       };
       el.Body=dom;
       el.IsRendered=false;
       return el;
      },
      New1:function(HtmlProvider)
      {
       var r;
       r=Runtime.New(this,{});
       r["HtmlProvider@32"]=HtmlProvider;
       return r;
      }
     }),
     Events:{
      JQueryEventSupport:Runtime.Class({
       OnBlur:function(f,el)
       {
        return jQuery(el.get_Body()).bind("blur",function()
        {
         return f(el);
        });
       },
       OnChange:function(f,el)
       {
        return jQuery(el.get_Body()).bind("change",function()
        {
         return f(el);
        });
       },
       OnClick:function(f,el)
       {
        return this.OnMouse("click",f,el);
       },
       OnDoubleClick:function(f,el)
       {
        return this.OnMouse("dblclick",f,el);
       },
       OnError:function(f,el)
       {
        return jQuery(el.get_Body()).bind("error",function()
        {
         return f(el);
        });
       },
       OnFocus:function(f,el)
       {
        return jQuery(el.get_Body()).bind("focus",function()
        {
         return f(el);
        });
       },
       OnKeyDown:function(f,el)
       {
        var h;
        h=function(ev)
        {
         return(f(el))({
          KeyCode:ev.keyCode
         });
        };
        return jQuery(el.get_Body()).bind("keydown",h);
       },
       OnKeyPress:function(f,el)
       {
        return jQuery(el.get_Body()).keypress(function(arg)
        {
         return(f(el))({
          CharacterCode:arg.which
         });
        });
       },
       OnKeyUp:function(f,el)
       {
        var h;
        h=function(ev)
        {
         return(f(el))({
          KeyCode:ev.keyCode
         });
        };
        return jQuery(el.get_Body()).bind("keyup",h);
       },
       OnLoad:function(f,el)
       {
        return jQuery(el.get_Body()).bind("load",function()
        {
         return f(el);
        });
       },
       OnMouse:function(name,f,el)
       {
        var h;
        h=function(ev)
        {
         return(f(el))({
          X:ev.pageX,
          Y:ev.pageY
         });
        };
        return jQuery(el.get_Body()).bind(name,h);
       },
       OnMouseDown:function(f,el)
       {
        return this.OnMouse("mousedown",f,el);
       },
       OnMouseEnter:function(f,el)
       {
        return this.OnMouse("mouseenter",f,el);
       },
       OnMouseLeave:function(f,el)
       {
        return this.OnMouse("mouseleave",f,el);
       },
       OnMouseMove:function(f,el)
       {
        return this.OnMouse("mousemove",f,el);
       },
       OnMouseOut:function(f,el)
       {
        return this.OnMouse("mouseout",f,el);
       },
       OnMouseUp:function(f,el)
       {
        return this.OnMouse("mouseup",f,el);
       },
       OnResize:function(f,el)
       {
        return jQuery(el.get_Body()).bind("resize",function()
        {
         return f(el);
        });
       },
       OnScroll:function(f,el)
       {
        return jQuery(el.get_Body()).bind("scroll",function()
        {
         return f(el);
        });
       },
       OnSelect:function(f,el)
       {
        return jQuery(el.get_Body()).bind("select",function()
        {
         return f(el);
        });
       },
       OnSubmit:function(f,el)
       {
        return jQuery(el.get_Body()).bind("submit",function()
        {
         return f(el);
        });
       },
       OnUnLoad:function(f,el)
       {
        return jQuery(el.get_Body()).bind("unload",function()
        {
         return f(el);
        });
       }
      },{
       New:function()
       {
        return Runtime.New(this,{});
       }
      })
     },
     EventsPervasives:{
      Events:Runtime.Field(function()
      {
       return JQueryEventSupport.New();
      })
     },
     Html5AttributeBuilder:Runtime.Class({
      NewAttr:function(name,value)
      {
       return Attribute.New(this.HtmlProvider,name,value);
      }
     },{
      New:function(HtmlProvider)
      {
       var r;
       r=Runtime.New(this,{});
       r.HtmlProvider=HtmlProvider;
       return r;
      }
     }),
     Html5TagBuilder:Runtime.Class({
      NewTag:function(name,children)
      {
       var el,enumerator;
       el=Element.New(this.HtmlProvider,name);
       enumerator=Enumerator.Get(children);
       while(enumerator.MoveNext())
        {
         el.AppendI(enumerator.get_Current());
        }
       return el;
      }
     },{
      New:function(HtmlProvider)
      {
       var r;
       r=Runtime.New(this,{});
       r.HtmlProvider=HtmlProvider;
       return r;
      }
     }),
     Implementation:{
      Attr:Runtime.Field(function()
      {
       return AttributeBuilder.New(Implementation.HtmlProvider());
      }),
      DeprecatedHtml:Runtime.Field(function()
      {
       return DeprecatedTagBuilder.New(Implementation.HtmlProvider());
      }),
      HTML5:{
       Attr:Runtime.Field(function()
       {
        return Html5AttributeBuilder.New(HTML5.Html5Provider());
       }),
       Html5Provider:Runtime.Field(function()
       {
        return JQueryHtmlProvider.New();
       }),
       Tags:Runtime.Field(function()
       {
        return Html5TagBuilder.New(HTML5.Html5Provider());
       })
      },
      HtmlProvider:Runtime.Field(function()
      {
       return JQueryHtmlProvider.New();
      }),
      JQueryHtmlProvider:Runtime.Class({
       AddClass:function(node,cls)
       {
        return jQuery(node).addClass(cls);
       },
       AppendAttribute:function(node,attr)
       {
        return this.SetAttribute(node,attr.nodeName,attr.nodeValue);
       },
       AppendNode:function(node,el)
       {
        return jQuery(node).append(jQuery(el));
       },
       Clear:function(node)
       {
        return jQuery(node).contents().detach();
       },
       CreateAttribute:function(str)
       {
        return document.createAttribute(str);
       },
       CreateElement:function(name)
       {
        return document.createElement(name);
       },
       CreateTextNode:function(str)
       {
        return document.createTextNode(str);
       },
       GetAttribute:function(node,name)
       {
        return jQuery(node).attr(name);
       },
       GetHtml:function(node)
       {
        return jQuery(node).html();
       },
       GetProperty:function(node,name)
       {
        return jQuery(node).attr(name);
       },
       GetText:function(node)
       {
        return node.textContent;
       },
       GetValue:function(node)
       {
        return jQuery(node).val();
       },
       HasAttribute:function(node,name)
       {
        return jQuery(node).attr(name)!=null;
       },
       OnDocumentReady:function(f)
       {
        return jQuery(document).ready(f);
       },
       OnLoad:function(node,f)
       {
        return jQuery(node).ready(f);
       },
       Remove:function(node)
       {
        return jQuery(node).remove();
       },
       RemoveAttribute:function(node,name)
       {
        return jQuery(node).removeAttr(name);
       },
       RemoveClass:function(node,cls)
       {
        return jQuery(node).removeClass(cls);
       },
       SetAttribute:function(node,name,value)
       {
        return jQuery(node).attr(name,value);
       },
       SetCss:function(node,name,prop)
       {
        return jQuery(node).css(name,prop);
       },
       SetHtml:function(node,text)
       {
        return jQuery(node).html(text);
       },
       SetProperty:function(node,name,value)
       {
        return jQuery(node).prop(name,value);
       },
       SetStyle:function(node,style)
       {
        return jQuery(node).attr("style",style);
       },
       SetText:function(node,text)
       {
        node.textContent=text;
       },
       SetValue:function(node,value)
       {
        return jQuery(node).val(value);
       }
      },{
       New:function()
       {
        return Runtime.New(this,{});
       }
      }),
      Tags:Runtime.Field(function()
      {
       return TagBuilder.New(Implementation.HtmlProvider());
      })
     },
     Operators:{
      OnAfterRender:function(f,w)
      {
       var r;
       r=w.Render;
       w.Render=function()
       {
        r.apply(w);
        return f(w);
       };
       return;
      },
      OnBeforeRender:function(f,w)
      {
       var r;
       r=w.Render;
       w.Render=function()
       {
        f(w);
        return r.apply(w);
       };
       return;
      },
      add:function(el,inner)
      {
       var enumerator;
       enumerator=Enumerator.Get(inner);
       while(enumerator.MoveNext())
        {
         el.AppendI(enumerator.get_Current());
        }
       return el;
      }
     },
     PageletExtensions:{
      "IPagelet.AppendTo":function(p,targetId)
      {
       document.getElementById(targetId).appendChild(p.get_Body());
       return p.Render();
      }
     },
     TagBuilder:Runtime.Class({
      Div:function(x)
      {
       return this.NewTag("div",x);
      },
      NewTag:function(name,children)
      {
       var el,enumerator;
       el=Element.New(this.HtmlProvider,name);
       enumerator=Enumerator.Get(children);
       while(enumerator.MoveNext())
        {
         el.AppendI(enumerator.get_Current());
        }
       return el;
      },
      text:function(data)
      {
       return Runtime.New(Text,{
        text:data
       });
      }
     },{
      New:function(HtmlProvider)
      {
       var r;
       r=Runtime.New(this,{});
       r.HtmlProvider=HtmlProvider;
       return r;
      }
     }),
     Text:Runtime.Class({
      Render:function()
      {
       return null;
      },
      get_Body:function()
      {
       return document.createTextNode(this.text);
      }
     })
    }
   }
  }
 });
 Runtime.OnInit(function()
 {
  WebSharper=Runtime.Safe(Global.IntelliFactory.WebSharper);
  Html=Runtime.Safe(WebSharper.Html);
  Activator=Runtime.Safe(Html.Activator);
  document=Runtime.Safe(Global.document);
  Default=Runtime.Safe(Html.Default);
  JavaScript=Runtime.Safe(WebSharper.JavaScript);
  Json=Runtime.Safe(WebSharper.Json);
  JSON=Runtime.Safe(Global.JSON);
  Arrays=Runtime.Safe(WebSharper.Arrays);
  Attribute=Runtime.Safe(Html.Attribute);
  Implementation=Runtime.Safe(Html.Implementation);
  HTML5=Runtime.Safe(Implementation.HTML5);
  Element=Runtime.Safe(Html.Element);
  Enumerator=Runtime.Safe(WebSharper.Enumerator);
  Math=Runtime.Safe(Global.Math);
  jQuery=Runtime.Safe(Global.jQuery);
  Events=Runtime.Safe(Html.Events);
  JQueryEventSupport=Runtime.Safe(Events.JQueryEventSupport);
  AttributeBuilder=Runtime.Safe(Html.AttributeBuilder);
  DeprecatedTagBuilder=Runtime.Safe(Html.DeprecatedTagBuilder);
  Html5AttributeBuilder=Runtime.Safe(Html.Html5AttributeBuilder);
  JQueryHtmlProvider=Runtime.Safe(Implementation.JQueryHtmlProvider);
  Html5TagBuilder=Runtime.Safe(Html.Html5TagBuilder);
  TagBuilder=Runtime.Safe(Html.TagBuilder);
  Text=Runtime.Safe(Html.Text);
  HTML51=Runtime.Safe(Default.HTML5);
  return EventsPervasives=Runtime.Safe(Html.EventsPervasives);
 });
 Runtime.OnLoad(function()
 {
  Implementation.Tags();
  Implementation.HtmlProvider();
  HTML5.Tags();
  HTML5.Html5Provider();
  HTML5.Attr();
  Implementation.DeprecatedHtml();
  Implementation.Attr();
  EventsPervasives.Events();
  Default.Tags();
  HTML51.Tags();
  HTML51.Attr();
  Default.Deprecated();
  Default.Attr();
  Activator.Activate();
  return;
 });
}());

(function()
{
 var Global=this,Runtime=this.IntelliFactory.Runtime,WebSharper,IntrinsicFunctionProxy,Operators,Unchecked,JavaScript,ok,Testing,Pervasives,TestBuilder,test,Arrays,Random,Math,NaN1,Infinity1,List,String,Seq;
 Runtime.Define(Global,{
  IntelliFactory:{
   WebSharper:{
    Testing:{
     Assert:{
      For:function(times,gen,attempt)
      {
       var i,i1;
       for(i=0;i<=IntrinsicFunctionProxy.GetLength(gen.Base)-1;i++){
        attempt(gen.Base[i]);
       }
       for(i1=1;i1<=times;i1++){
        attempt(gen.Next.call(null,null));
       }
       return;
      },
      Raises:function(f)
      {
       var matchValue;
       try
       {
        f(null);
        return Operators.FailWith("No exception was thrown.");
       }
       catch(matchValue)
       {
        return null;
       }
      }
     },
     Pervasives:{
      Is:function(a,b)
      {
       if(!Unchecked.Equals(a,b))
        {
         JavaScript.Log(["Equality test failed.",a,b]);
         return ok(false,"Equality test failed.");
        }
       else
        {
         return ok(true,"Pass.");
        }
      },
      Isnt:function(a,b)
      {
       if(Unchecked.Equals(a,b))
        {
         JavaScript.Log(["Inequality test failed.",a,b]);
         return ok(false,"Inequality test failed.");
        }
       else
        {
         return ok(true,"Pass.");
        }
      },
      Test:function(name)
      {
       return TestBuilder.New(name);
      },
      TestBuilder:Runtime.Class({
       Delay:function(f)
       {
        return test(this.name,f);
       },
       Zero:function()
       {
        return null;
       }
      },{
       New:function(name)
       {
        var r;
        r=Runtime.New(this,{});
        r.name=name;
        return r;
       }
      })
     },
     Random:{
      ArrayOf:function(generator)
      {
       return{
        Base:[[]],
        Next:function()
        {
         return Arrays.init(Random.Natural().Next.call(null,null)%100,function()
         {
          return generator.Next.call(null,null);
         });
        }
       };
      },
      Boolean:Runtime.Field(function()
      {
       return{
        Base:[true,false],
        Next:function()
        {
         return Random.StandardUniform().Next.call(null,null)>0.5;
        }
       };
      }),
      Const:function(x)
      {
       return{
        Base:[x],
        Next:function()
        {
         return x;
        }
       };
      },
      Exponential:function(lambda)
      {
       return{
        Base:[],
        Next:function()
        {
         return-Math.log(1-Random.StandardUniform().Next.call(null,null))/lambda;
        }
       };
      },
      Float:Runtime.Field(function()
      {
       return{
        Base:[0],
        Next:function()
        {
         return(Random.Boolean().Next.call(null,null)?1:-1)*Random.Exponential(0.1).Next.call(null,null);
        }
       };
      }),
      FloatExhaustive:Runtime.Field(function()
      {
       return{
        Base:[0,NaN1,Infinity1,-Infinity1],
        Next:function()
        {
         return Random.Float().Next.call(null,null);
        }
       };
      }),
      FloatWithin:function(low,hi)
      {
       return{
        Base:[low,hi],
        Next:function()
        {
         return low+(hi-low)*Math.random();
        }
       };
      },
      Implies:function(a,b)
      {
       return!a?true:b;
      },
      Imply:function(a,b)
      {
       return Random.Implies(a,b);
      },
      Int:Runtime.Field(function()
      {
       return{
        Base:[0,1,-1],
        Next:function()
        {
         return Math.round(Random.Float().Next.call(null,null));
        }
       };
      }),
      ListOf:function(generator)
      {
       return Random.Map(function(array)
       {
        return List.ofArray(array);
       },Random.ArrayOf(generator));
      },
      Map:function(f,gen)
      {
       var f1;
       f1=gen.Next;
       return{
        Base:Arrays.map(f,gen.Base),
        Next:function(x)
        {
         return f(f1(x));
        }
       };
      },
      Mix:function(a,b)
      {
       var left;
       left={
        contents:false
       };
       return{
        Base:a.Base.concat(b.Base),
        Next:function()
        {
         left.contents=!left.contents;
         return left.contents?a.Next.call(null,null):b.Next.call(null,null);
        }
       };
      },
      Natural:Runtime.Field(function()
      {
       var g;
       g=Random.Int().Next;
       return{
        Base:[0,1],
        Next:function(x)
        {
         return Math.abs(g(x));
        }
       };
      }),
      OneOf:function(seeds)
      {
       var index;
       index=Random.Within(1,IntrinsicFunctionProxy.GetLength(seeds));
       return{
        Base:seeds,
        Next:function()
        {
         return seeds[index.Next.call(null,null)-1];
        }
       };
      },
      OptionOf:function(generator)
      {
       return Random.Mix(Random.Const({
        $:0
       }),Random.Map(function(arg0)
       {
        return{
         $:1,
         $0:arg0
        };
       },generator));
      },
      StandardUniform:Runtime.Field(function()
      {
       return{
        Base:[],
        Next:function()
        {
         return Math.random();
        }
       };
      }),
      String:Runtime.Field(function()
      {
       return{
        Base:[""],
        Next:function()
        {
         return String.fromCharCode.apply(undefined,Arrays.init(Random.Natural().Next.call(null,null)%100,function()
         {
          return Random.Int().Next.call(null,null)%256;
         }));
        }
       };
      }),
      StringExhaustive:Runtime.Field(function()
      {
       return{
        Base:[null,""],
        Next:Random.String().Next
       };
      }),
      Tuple2Of:function(a,b)
      {
       return{
        Base:Seq.toArray(Seq.delay(function()
        {
         return Seq.collect(function(x)
         {
          return Seq.map(function(y)
          {
           return[x,y];
          },b.Base);
         },a.Base);
        })),
        Next:function()
        {
         return[a.Next.call(null,null),b.Next.call(null,null)];
        }
       };
      },
      Tuple3Of:function(a,b,c)
      {
       return{
        Base:Seq.toArray(Seq.delay(function()
        {
         return Seq.collect(function(x)
         {
          return Seq.collect(function(y)
          {
           return Seq.map(function(z)
           {
            return[x,y,z];
           },c.Base);
          },b.Base);
         },a.Base);
        })),
        Next:function()
        {
         return[a.Next.call(null,null),b.Next.call(null,null),c.Next.call(null,null)];
        }
       };
      },
      Within:function(low,hi)
      {
       return{
        Base:[low,hi],
        Next:function()
        {
         return Random.Natural().Next.call(null,null)%(hi-low)+low;
        }
       };
      }
     }
    }
   }
  }
 });
 Runtime.OnInit(function()
 {
  WebSharper=Runtime.Safe(Global.IntelliFactory.WebSharper);
  IntrinsicFunctionProxy=Runtime.Safe(WebSharper.IntrinsicFunctionProxy);
  Operators=Runtime.Safe(WebSharper.Operators);
  Unchecked=Runtime.Safe(WebSharper.Unchecked);
  JavaScript=Runtime.Safe(WebSharper.JavaScript);
  ok=Runtime.Safe(Global.ok);
  Testing=Runtime.Safe(WebSharper.Testing);
  Pervasives=Runtime.Safe(Testing.Pervasives);
  TestBuilder=Runtime.Safe(Pervasives.TestBuilder);
  test=Runtime.Safe(Global.test);
  Arrays=Runtime.Safe(WebSharper.Arrays);
  Random=Runtime.Safe(Testing.Random);
  Math=Runtime.Safe(Global.Math);
  NaN1=Runtime.Safe(Global.NaN);
  Infinity1=Runtime.Safe(Global.Infinity);
  List=Runtime.Safe(WebSharper.List);
  String=Runtime.Safe(Global.String);
  return Seq=Runtime.Safe(WebSharper.Seq);
 });
 Runtime.OnLoad(function()
 {
  Random.StringExhaustive();
  Random.String();
  Random.StandardUniform();
  Random.Natural();
  Random.Int();
  Random.FloatExhaustive();
  Random.Float();
  Random.Boolean();
  return;
 });
}());

(function()
{
 var Global=this,Runtime=this.IntelliFactory.Runtime,WebSharper,List,Arrays,Unchecked,Control,Disposable,IntrinsicFunctionProxy,FSharpEvent,Util,Event,Event1,EventModule,HotStream,HotStream1,Observable,Observer,Operators,Observable1,T,ObservableModule,Observer1;
 Runtime.Define(Global,{
  IntelliFactory:{
   WebSharper:{
    Control:{
     Disposable:{
      Of:function(dispose)
      {
       return{
        Dispose:dispose
       };
      }
     },
     Event:{
      Event:Runtime.Class({
       AddHandler:function(h)
       {
        return this.Handlers.push(h);
       },
       RemoveHandler:function(h)
       {
        var x;
        x=List.ofArray(Arrays.choose(function(x1)
        {
         return x1;
        },Arrays.mapi(function(i)
        {
         return function(x1)
         {
          return Unchecked.Equals(x1,h)?{
           $:1,
           $0:i
          }:{
           $:0
          };
         };
        },this.Handlers)));
        return x.$==1?this.Handlers.splice(x.$0,1):null;
       },
       Subscribe:function(observer)
       {
        var h,_this=this;
        h=function(x)
        {
         return observer.OnNext(x);
        };
        this.AddHandler(h);
        return Disposable.Of(function()
        {
         return _this.RemoveHandler(h);
        });
       },
       Trigger:function(x)
       {
        var i;
        for(i=0;i<=IntrinsicFunctionProxy.GetLength(this.Handlers)-1;i++){
         this.Handlers[i].call(null,x);
        }
        return;
       }
      })
     },
     EventModule:{
      Choose:function(c,e)
      {
       var r;
       r=FSharpEvent.New();
       Util.addListener(e,function(x)
       {
        var matchValue;
        matchValue=c(x);
        return matchValue.$==0?null:r.event.Trigger(matchValue.$0);
       });
       return r.event;
      },
      Filter:function(ok,e)
      {
       var r;
       r=Runtime.New(Event1,{
        Handlers:[]
       });
       Util.addListener(e,function(x)
       {
        return ok(x)?r.Trigger(x):null;
       });
       return r;
      },
      Map:function(f,e)
      {
       var r;
       r=Runtime.New(Event1,{
        Handlers:[]
       });
       Util.addListener(e,function(x)
       {
        return r.Trigger(f(x));
       });
       return r;
      },
      Merge:function(e1,e2)
      {
       var r;
       r=Runtime.New(Event1,{
        Handlers:[]
       });
       Util.addListener(e1,function(arg00)
       {
        return r.Trigger(arg00);
       });
       Util.addListener(e2,function(arg00)
       {
        return r.Trigger(arg00);
       });
       return r;
      },
      Pairwise:function(e)
      {
       var buf,ev;
       buf={
        contents:{
         $:0
        }
       };
       ev=Runtime.New(Event1,{
        Handlers:[]
       });
       Util.addListener(e,function(x)
       {
        var matchValue,old;
        matchValue=buf.contents;
        if(matchValue.$==1)
         {
          old=matchValue.$0;
          buf.contents={
           $:1,
           $0:x
          };
          return ev.Trigger([old,x]);
         }
        else
         {
          buf.contents={
           $:1,
           $0:x
          };
          return;
         }
       });
       return ev;
      },
      Partition:function(f,e)
      {
       return[EventModule.Filter(f,e),EventModule.Filter(function(x)
       {
        return!f(x);
       },e)];
      },
      Scan:function(fold,seed,e)
      {
       var state;
       state={
        contents:seed
       };
       return EventModule.Map(function(value)
       {
        state.contents=(fold(state.contents))(value);
        return state.contents;
       },e);
      },
      Split:function(f,e)
      {
       return[EventModule.Choose(function(x)
       {
        var matchValue;
        matchValue=f(x);
        return matchValue.$==0?{
         $:1,
         $0:matchValue.$0
        }:{
         $:0
        };
       },e),EventModule.Choose(function(x)
       {
        var matchValue;
        matchValue=f(x);
        return matchValue.$==1?{
         $:1,
         $0:matchValue.$0
        }:{
         $:0
        };
       },e)];
      }
     },
     FSharpEvent:Runtime.Class({},{
      New:function()
      {
       var r;
       r=Runtime.New(this,{});
       r.event=Runtime.New(Event1,{
        Handlers:[]
       });
       return r;
      }
     }),
     HotStream:{
      HotStream:Runtime.Class({
       Subscribe:function(o)
       {
        if(this.Latest.contents.$==1)
         {
          o.OnNext(this.Latest.contents.$0);
         }
        return Util.subscribeTo(this.Event.event,function(v)
        {
         return o.OnNext(v);
        });
       },
       Trigger:function(v)
       {
        this.Latest.contents={
         $:1,
         $0:v
        };
        return this.Event.event.Trigger(v);
       }
      },{
       New:function()
       {
        return Runtime.New(HotStream1,{
         Latest:{
          contents:{
           $:0
          }
         },
         Event:FSharpEvent.New()
        });
       }
      })
     },
     Observable:{
      Aggregate:function(io,seed,acc)
      {
       return Observable.New(function(o)
       {
        var state;
        state={
         contents:seed
        };
        return Util.subscribeTo(io,function(value)
        {
         state.contents=(acc(state.contents))(value);
         return o.OnNext(state.contents);
        });
       });
      },
      Choose:function(f,io)
      {
       return Observable.New(function(o1)
       {
        return io.Subscribe(Observer.New(function(v)
        {
         var matchValue;
         matchValue=f(v);
         return matchValue.$==0?null:o1.OnNext(matchValue.$0);
        },function(arg00)
        {
         return o1.OnError(arg00);
        },function()
        {
         return o1.OnCompleted();
        }));
       });
      },
      CombineLatest:function(io1,io2,f)
      {
       return Observable.New(function(o)
       {
        var lv1,lv2,update,o1,o2,d1,d2;
        lv1={
         contents:{
          $:0
         }
        };
        lv2={
         contents:{
          $:0
         }
        };
        update=function()
        {
         var matchValue,v2;
         matchValue=[lv1.contents,lv2.contents];
         if(matchValue[0].$==1)
          {
           if(matchValue[1].$==1)
            {
             v2=matchValue[1].$0;
             return o.OnNext((f(matchValue[0].$0))(v2));
            }
           else
            {
             return null;
            }
          }
         else
          {
           return null;
          }
        };
        o1=Observer.New(function(x)
        {
         lv1.contents={
          $:1,
          $0:x
         };
         return update(null);
        },function()
        {
        },function()
        {
        });
        o2=Observer.New(function(y)
        {
         lv2.contents={
          $:1,
          $0:y
         };
         return update(null);
        },function()
        {
        },function()
        {
        });
        d1=io1.Subscribe(o1);
        d2=io2.Subscribe(o2);
        return Disposable.Of(function()
        {
         d1.Dispose();
         return d2.Dispose();
        });
       });
      },
      Concat:function(io1,io2)
      {
       return Observable.New(function(o)
       {
        var innerDisp,outerDisp;
        innerDisp={
         contents:{
          $:0
         }
        };
        outerDisp=io1.Subscribe(Observer.New(function(arg00)
        {
         return o.OnNext(arg00);
        },function()
        {
        },function()
        {
         innerDisp.contents={
          $:1,
          $0:io2.Subscribe(o)
         };
        }));
        return Disposable.Of(function()
        {
         if(innerDisp.contents.$==1)
          {
           innerDisp.contents.$0.Dispose();
          }
         return outerDisp.Dispose();
        });
       });
      },
      Drop:function(count,io)
      {
       return Observable.New(function(o1)
       {
        var index;
        index={
         contents:0
        };
        return io.Subscribe(Observer.New(function(v)
        {
         Operators.Increment(index);
         return index.contents>count?o1.OnNext(v):null;
        },function(arg00)
        {
         return o1.OnError(arg00);
        },function()
        {
         return o1.OnCompleted();
        }));
       });
      },
      Filter:function(f,io)
      {
       return Observable.New(function(o1)
       {
        return io.Subscribe(Observer.New(function(v)
        {
         return f(v)?o1.OnNext(v):null;
        },function(arg00)
        {
         return o1.OnError(arg00);
        },function()
        {
         return o1.OnCompleted();
        }));
       });
      },
      Map:function(f,io)
      {
       return Observable.New(function(o1)
       {
        return io.Subscribe(Observer.New(function(v)
        {
         return o1.OnNext(f(v));
        },function(arg00)
        {
         return o1.OnError(arg00);
        },function()
        {
         return o1.OnCompleted();
        }));
       });
      },
      Merge:function(io1,io2)
      {
       return Observable.New(function(o)
       {
        var completed1,completed2,disp1,disp2;
        completed1={
         contents:false
        };
        completed2={
         contents:false
        };
        disp1=io1.Subscribe(Observer.New(function(arg00)
        {
         return o.OnNext(arg00);
        },function()
        {
        },function()
        {
         completed1.contents=true;
         return(completed1.contents?completed2.contents:false)?o.OnCompleted():null;
        }));
        disp2=io2.Subscribe(Observer.New(function(arg00)
        {
         return o.OnNext(arg00);
        },function()
        {
        },function()
        {
         completed2.contents=true;
         return(completed1.contents?completed2.contents:false)?o.OnCompleted():null;
        }));
        return Disposable.Of(function()
        {
         disp1.Dispose();
         return disp2.Dispose();
        });
       });
      },
      Never:function()
      {
       return Observable.New(function()
       {
        return Disposable.Of(function()
        {
        });
       });
      },
      New:function(f)
      {
       return Runtime.New(Observable1,{
        Subscribe1:f
       });
      },
      Observable:Runtime.Class({
       Subscribe:function(observer)
       {
        return this.Subscribe1.call(null,observer);
       }
      }),
      Of:function(f)
      {
       return Observable.New(function(o)
       {
        return Disposable.Of(f(function(x)
        {
         return o.OnNext(x);
        }));
       });
      },
      Range:function(start,count)
      {
       return Observable.New(function(o)
       {
        var i;
        for(i=start;i<=start+count;i++){
         o.OnNext(i);
        }
        return Disposable.Of(function()
        {
        });
       });
      },
      Return:function(x)
      {
       return Observable.New(function(o)
       {
        o.OnNext(x);
        o.OnCompleted();
        return Disposable.Of(function()
        {
        });
       });
      },
      SelectMany:function(io)
      {
       return Observable.New(function(o)
       {
        var disp,d;
        disp={
         contents:function()
         {
         }
        };
        d=Util.subscribeTo(io,function(o1)
        {
         var d1;
         d1=Util.subscribeTo(o1,function(v)
         {
          return o.OnNext(v);
         });
         disp.contents=function()
         {
          disp.contents.call(null,null);
          return d1.Dispose();
         };
         return;
        });
        return Disposable.Of(function()
        {
         disp.contents.call(null,null);
         return d.Dispose();
        });
       });
      },
      Sequence:function(ios)
      {
       var sequence;
       sequence=function(ios1)
       {
        return ios1.$==1?Observable.CombineLatest(ios1.$0,sequence(ios1.$1),function(x)
        {
         return function(y)
         {
          return Runtime.New(T,{
           $:1,
           $0:x,
           $1:y
          });
         };
        }):Observable.Return(Runtime.New(T,{
         $:0
        }));
       };
       return sequence(List.ofSeq(ios));
      },
      Switch:function(io)
      {
       return Observable.New(function(o)
       {
        var index,disp;
        index={
         contents:0
        };
        disp={
         contents:{
          $:0
         }
        };
        return Util.subscribeTo(io,function(o1)
        {
         var currentIndex;
         Operators.Increment(index);
         if(disp.contents.$==1)
          {
           disp.contents.$0.Dispose();
          }
         currentIndex=index.contents;
         disp.contents={
          $:1,
          $0:Util.subscribeTo(o1,function(v)
          {
           return currentIndex===index.contents?o.OnNext(v):null;
          })
         };
         return;
        });
       });
      }
     },
     ObservableModule:{
      Pairwise:function(e)
      {
       var x,collector,source;
       x=[{
        $:0
       },{
        $:0
       }];
       collector=Runtime.Tupled(function(tupledArg)
       {
        var o;
        o=tupledArg[1];
        return function(n)
        {
         return[o,{
          $:1,
          $0:n
         }];
        };
       });
       source=((Runtime.Tupled(function(state)
       {
        return function(source1)
        {
         return ObservableModule.Scan(collector,state,source1);
        };
       }))(x))(e);
       return Observable.Choose(Runtime.Tupled(function(_arg1)
       {
        return _arg1[0].$==1?_arg1[1].$==1?{
         $:1,
         $0:[_arg1[0].$0,_arg1[1].$0]
        }:{
         $:0
        }:{
         $:0
        };
       }),source);
      },
      Partition:function(f,e)
      {
       return[Observable.Filter(f,e),Observable.Filter(function(x)
       {
        return!f(x);
       },e)];
      },
      Scan:function(fold,seed,e)
      {
       var state;
       state={
        contents:seed
       };
       return Observable.Map(function(value)
       {
        state.contents=(fold(state.contents))(value);
        return state.contents;
       },e);
      },
      Split:function(f,e)
      {
       var chooser;
       chooser=function(x)
       {
        var matchValue;
        matchValue=f(x);
        return matchValue.$==1?{
         $:1,
         $0:matchValue.$0
        }:{
         $:0
        };
       };
       return[Observable.Choose(function(x)
       {
        var matchValue;
        matchValue=f(x);
        return matchValue.$==0?{
         $:1,
         $0:matchValue.$0
        }:{
         $:0
        };
       },e),Observable.Choose(chooser,e)];
      }
     },
     Observer:{
      New:function(f,e,c)
      {
       return Runtime.New(Observer1,{
        onNext:f,
        onError:e,
        onCompleted:c
       });
      },
      Observer:Runtime.Class({
       OnCompleted:function()
       {
        return this.onCompleted.call(null,null);
       },
       OnError:function(e)
       {
        return this.onError.call(null,e);
       },
       OnNext:function(x)
       {
        return this.onNext.call(null,x);
       }
      }),
      Of:function(f)
      {
       return Runtime.New(Observer1,{
        onNext:function(x)
        {
         return f(x);
        },
        onError:function(x)
        {
         return Operators.Raise(x);
        },
        onCompleted:function()
        {
         return null;
        }
       });
      }
     }
    }
   }
  }
 });
 Runtime.OnInit(function()
 {
  WebSharper=Runtime.Safe(Global.IntelliFactory.WebSharper);
  List=Runtime.Safe(WebSharper.List);
  Arrays=Runtime.Safe(WebSharper.Arrays);
  Unchecked=Runtime.Safe(WebSharper.Unchecked);
  Control=Runtime.Safe(WebSharper.Control);
  Disposable=Runtime.Safe(Control.Disposable);
  IntrinsicFunctionProxy=Runtime.Safe(WebSharper.IntrinsicFunctionProxy);
  FSharpEvent=Runtime.Safe(Control.FSharpEvent);
  Util=Runtime.Safe(WebSharper.Util);
  Event=Runtime.Safe(Control.Event);
  Event1=Runtime.Safe(Event.Event);
  EventModule=Runtime.Safe(Control.EventModule);
  HotStream=Runtime.Safe(Control.HotStream);
  HotStream1=Runtime.Safe(HotStream.HotStream);
  Observable=Runtime.Safe(Control.Observable);
  Observer=Runtime.Safe(Control.Observer);
  Operators=Runtime.Safe(WebSharper.Operators);
  Observable1=Runtime.Safe(Observable.Observable);
  T=Runtime.Safe(List.T);
  ObservableModule=Runtime.Safe(Control.ObservableModule);
  return Observer1=Runtime.Safe(Observer.Observer);
 });
 Runtime.OnLoad(function()
 {
  return;
 });
}());

(function()
{
 var Global=this,Runtime=this.IntelliFactory.Runtime,WebSharper,Collections,BalancedTree,Operators,Seq,List,T,Arrays,IntrinsicFunctionProxy,Enumerator,JavaScript,DictionaryUtil,Dictionary,Unchecked,FSharpMap,Pair,Option,MapUtil,FSharpSet,SetModule,SetUtil,HashSet,HashSetUtil,HashSet1,ResizeArray,LinkedList,EnumeratorProxy,ListProxy,ResizeArrayProxy;
 Runtime.Define(Global,{
  IntelliFactory:{
   WebSharper:{
    Collections:{
     BalancedTree:{
      Add:function(x,t)
      {
       return BalancedTree.Put(function()
       {
        return function(x1)
        {
         return x1;
        };
       },x,t);
      },
      Branch:function(node,left,right)
      {
       return{
        Node:node,
        Left:left,
        Right:right,
        Height:1+Operators.Max(left==null?0:left.Height,right==null?0:right.Height),
        Count:1+(left==null?0:left.Count)+(right==null?0:right.Count)
       };
      },
      Build:function(data,min,max)
      {
       var center;
       if(max-min+1<=0)
        {
         return null;
        }
       else
        {
         center=(min+max)/2>>0;
         return BalancedTree.Branch(data[center],BalancedTree.Build(data,min,center-1),BalancedTree.Build(data,center+1,max));
        }
      },
      Contains:function(v,t)
      {
       return!((BalancedTree.Lookup(v,t))[0]==null);
      },
      Enumerate:function(flip,t)
      {
       var gen;
       gen=Runtime.Tupled(function(tupledArg)
       {
        var t1,spine;
        t1=tupledArg[0];
        spine=tupledArg[1];
        return t1==null?spine.$==1?{
         $:1,
         $0:[spine.$0[0],[spine.$0[1],spine.$1]]
        }:{
         $:0
        }:flip?gen([t1.Right,Runtime.New(T,{
         $:1,
         $0:[t1.Node,t1.Left],
         $1:spine
        })]):gen([t1.Left,Runtime.New(T,{
         $:1,
         $0:[t1.Node,t1.Right],
         $1:spine
        })]);
       });
       return Seq.unfold(gen,[t,Runtime.New(T,{
        $:0
       })]);
      },
      Lookup:function(k,t)
      {
       var spine,t1,loop,matchValue;
       spine=[];
       t1=t;
       loop=true;
       while(loop)
        {
         if(t1==null)
          {
           loop=false;
          }
         else
          {
           matchValue=Operators.Compare(k,t1.Node);
           if(matchValue===0)
            {
             loop=false;
            }
           else
            {
             if(matchValue===1)
              {
               spine.unshift([true,t1.Node,t1.Left]);
               t1=t1.Right;
              }
             else
              {
               spine.unshift([false,t1.Node,t1.Right]);
               t1=t1.Left;
              }
            }
          }
        }
       return[t1,spine];
      },
      OfSeq:function(data)
      {
       var data1;
       data1=Arrays.sort(Seq.toArray(Seq.distinct(data)));
       return BalancedTree.Build(data1,0,data1.length-1);
      },
      Put:function(combine,k,t)
      {
       var patternInput,t1,spine;
       patternInput=BalancedTree.Lookup(k,t);
       t1=patternInput[0];
       spine=patternInput[1];
       return t1==null?BalancedTree.Rebuild(spine,BalancedTree.Branch(k,null,null)):BalancedTree.Rebuild(spine,BalancedTree.Branch((combine(t1.Node))(k),t1.Left,t1.Right));
      },
      Rebuild:function(spine,t)
      {
       var h,t1,i,matchValue,_,x1,l,m,x2,r,m1;
       h=function(x)
       {
        return x==null?0:x.Height;
       };
       t1=t;
       for(i=0;i<=IntrinsicFunctionProxy.GetLength(spine)-1;i++){
        matchValue=spine[i];
        if(matchValue[0])
         {
          x1=matchValue[1];
          l=matchValue[2];
          if(h(t1)>h(l)+1)
           {
            if(h(t1.Left)===h(t1.Right)+1)
             {
              m=t1.Left;
              _=BalancedTree.Branch(m.Node,BalancedTree.Branch(x1,l,m.Left),BalancedTree.Branch(t1.Node,m.Right,t1.Right));
             }
            else
             {
              _=BalancedTree.Branch(t1.Node,BalancedTree.Branch(x1,l,t1.Left),t1.Right);
             }
           }
          else
           {
            _=BalancedTree.Branch(x1,l,t1);
           }
         }
        else
         {
          x2=matchValue[1];
          r=matchValue[2];
          if(h(t1)>h(r)+1)
           {
            if(h(t1.Right)===h(t1.Left)+1)
             {
              m1=t1.Right;
              _=BalancedTree.Branch(m1.Node,BalancedTree.Branch(t1.Node,t1.Left,m1.Left),BalancedTree.Branch(x2,m1.Right,r));
             }
            else
             {
              _=BalancedTree.Branch(t1.Node,t1.Left,BalancedTree.Branch(x2,t1.Right,r));
             }
           }
          else
           {
            _=BalancedTree.Branch(x2,t1,r);
           }
         }
        t1=_;
       }
       return t1;
      },
      Remove:function(k,src)
      {
       var patternInput,t,spine,data;
       patternInput=BalancedTree.Lookup(k,src);
       t=patternInput[0];
       spine=patternInput[1];
       if(t==null)
        {
         return src;
        }
       else
        {
         if(t.Right==null)
          {
           return BalancedTree.Rebuild(spine,t.Left);
          }
         else
          {
           if(t.Left==null)
            {
             return BalancedTree.Rebuild(spine,t.Right);
            }
           else
            {
             data=Seq.toArray(Seq.append(BalancedTree.Enumerate(false,t.Left),BalancedTree.Enumerate(false,t.Right)));
             return BalancedTree.Rebuild(spine,BalancedTree.Build(data,0,data.length-1));
            }
          }
        }
      },
      TryFind:function(v,t)
      {
       var x;
       x=(BalancedTree.Lookup(v,t))[0];
       return x==null?{
        $:0
       }:{
        $:1,
        $0:x.Node
       };
      }
     },
     Dictionary:Runtime.Class({
      Add:function(k,v)
      {
       var h;
       h=this.hash.call(null,k);
       if(this.data.hasOwnProperty(h))
        {
         return Operators.FailWith("An item with the same key has already been added.");
        }
       else
        {
         this.data[h]={
          K:k,
          V:v
         };
         this.count=this.count+1;
         return;
        }
      },
      Clear:function()
      {
       this.data={};
       this.count=0;
       return;
      },
      ContainsKey:function(k)
      {
       return this.data.hasOwnProperty(this.hash.call(null,k));
      },
      GetEnumerator:function()
      {
       return Enumerator.Get(JavaScript.GetFieldValues(this.data));
      },
      Remove:function(k)
      {
       var h;
       h=this.hash.call(null,k);
       if(this.data.hasOwnProperty(h))
        {
         JavaScript.Delete(this.data,h);
         this.count=this.count-1;
         return true;
        }
       else
        {
         return false;
        }
      },
      get_Item:function(k)
      {
       var k1;
       k1=this.hash.call(null,k);
       return this.data.hasOwnProperty(k1)?this.data[k1].V:DictionaryUtil.notPresent();
      },
      set_Item:function(k,v)
      {
       var h;
       h=this.hash.call(null,k);
       if(!this.data.hasOwnProperty(h))
        {
         this.count=this.count+1;
        }
       this.data[h]={
        K:k,
        V:v
       };
       return;
      }
     },{
      New:function(dictionary,comparer)
      {
       return Runtime.New(this,Dictionary.New11(dictionary,function(x)
       {
        return function(y)
        {
         return comparer.Equals(x,y);
        };
       },function(x)
       {
        return comparer.GetHashCode(x);
       }));
      },
      New1:function(dictionary)
      {
       return Runtime.New(this,Dictionary.New11(dictionary,function(x)
       {
        return function(y)
        {
         return Unchecked.Equals(x,y);
        };
       },function(obj)
       {
        return Unchecked.Hash(obj);
       }));
      },
      New11:function(init,equals,hash)
      {
       var r,enumerator,x;
       r=Runtime.New(this,{});
       r.hash=hash;
       r.count=0;
       r.data={};
       enumerator=Enumerator.Get(init);
       while(enumerator.MoveNext())
        {
         x=enumerator.get_Current();
         r.data[r.hash.call(null,x.K)]=x.V;
        }
       return r;
      },
      New12:function(comparer)
      {
       return Runtime.New(this,Dictionary.New11([],function(x)
       {
        return function(y)
        {
         return comparer.Equals(x,y);
        };
       },function(x)
       {
        return comparer.GetHashCode(x);
       }));
      },
      New2:function()
      {
       return Runtime.New(this,Dictionary.New11([],function(x)
       {
        return function(y)
        {
         return Unchecked.Equals(x,y);
        };
       },function(obj)
       {
        return Unchecked.Hash(obj);
       }));
      },
      New3:function()
      {
       return Runtime.New(this,Dictionary.New2());
      },
      New4:function(capacity,comparer)
      {
       return Runtime.New(this,Dictionary.New12(comparer));
      }
     }),
     DictionaryUtil:{
      notPresent:function()
      {
       return Operators.FailWith("The given key was not present in the dictionary.");
      }
     },
     FSharpMap:Runtime.Class({
      Add:function(k,v)
      {
       var t;
       t=this.tree;
       return FSharpMap.New1(BalancedTree.Add(Runtime.New(Pair,{
        Key:k,
        Value:v
       }),t));
      },
      CompareTo:function(other)
      {
       return Seq.compareWith(function(x)
       {
        return function(y)
        {
         return Operators.Compare(x,y);
        };
       },this,other);
      },
      ContainsKey:function(k)
      {
       var t;
       t=this.tree;
       return BalancedTree.Contains(Runtime.New(Pair,{
        Key:k,
        Value:undefined
       }),t);
      },
      Equals:function(other)
      {
       return this.get_Count()===other.get_Count()?Seq.forall2(function(x)
       {
        return function(y)
        {
         return Unchecked.Equals(x,y);
        };
       },this,other):false;
      },
      GetEnumerator:function()
      {
       return Enumerator.Get(Seq.map(function(kv)
       {
        return{
         K:kv.Key,
         V:kv.Value
        };
       },BalancedTree.Enumerate(false,this.tree)));
      },
      GetHashCode:function()
      {
       return Unchecked.Hash(Seq.toArray(this));
      },
      Remove:function(k)
      {
       var src;
       src=this.tree;
       return FSharpMap.New1(BalancedTree.Remove(Runtime.New(Pair,{
        Key:k,
        Value:undefined
       }),src));
      },
      TryFind:function(k)
      {
       var t;
       t=this.tree;
       return Option.map(function(kv)
       {
        return kv.Value;
       },BalancedTree.TryFind(Runtime.New(Pair,{
        Key:k,
        Value:undefined
       }),t));
      },
      get_Count:function()
      {
       var tree;
       tree=this.tree;
       return tree==null?0:tree.Count;
      },
      get_IsEmpty:function()
      {
       return this.tree==null;
      },
      get_Item:function(k)
      {
       var matchValue;
       matchValue=this.TryFind(k);
       return matchValue.$==0?Operators.FailWith("The given key was not present in the dictionary."):matchValue.$0;
      },
      get_Tree:function()
      {
       return this.tree;
      }
     },{
      New:function(s)
      {
       return Runtime.New(this,FSharpMap.New1(MapUtil.fromSeq(s)));
      },
      New1:function(tree)
      {
       var r;
       r=Runtime.New(this,{});
       r.tree=tree;
       return r;
      }
     }),
     FSharpSet:Runtime.Class({
      Add:function(x)
      {
       return FSharpSet.New1(BalancedTree.Add(x,this.tree));
      },
      CompareTo:function(other)
      {
       return Seq.compareWith(function(e1)
       {
        return function(e2)
        {
         return Operators.Compare(e1,e2);
        };
       },this,other);
      },
      Contains:function(v)
      {
       return BalancedTree.Contains(v,this.tree);
      },
      Equals:function(other)
      {
       return this.get_Count()===other.get_Count()?Seq.forall2(function(x)
       {
        return function(y)
        {
         return Unchecked.Equals(x,y);
        };
       },this,other):false;
      },
      GetEnumerator:function()
      {
       return Enumerator.Get(BalancedTree.Enumerate(false,this.tree));
      },
      GetHashCode:function()
      {
       return-1741749453+Unchecked.Hash(Seq.toArray(this));
      },
      IsProperSubsetOf:function(s)
      {
       return this.IsSubsetOf(s)?this.get_Count()<s.get_Count():false;
      },
      IsProperSupersetOf:function(s)
      {
       return this.IsSupersetOf(s)?this.get_Count()>s.get_Count():false;
      },
      IsSubsetOf:function(s)
      {
       return Seq.forall(function(arg00)
       {
        return s.Contains(arg00);
       },this);
      },
      IsSupersetOf:function(s)
      {
       var _this=this;
       return Seq.forall(function(arg00)
       {
        return _this.Contains(arg00);
       },s);
      },
      Remove:function(v)
      {
       return FSharpSet.New1(BalancedTree.Remove(v,this.tree));
      },
      add:function(x)
      {
       return FSharpSet.New1(BalancedTree.OfSeq(Seq.append(this,x)));
      },
      get_Count:function()
      {
       var tree;
       tree=this.tree;
       return tree==null?0:tree.Count;
      },
      get_IsEmpty:function()
      {
       return this.tree==null;
      },
      get_MaximumElement:function()
      {
       return Seq.head(BalancedTree.Enumerate(true,this.tree));
      },
      get_MinimumElement:function()
      {
       return Seq.head(BalancedTree.Enumerate(false,this.tree));
      },
      get_Tree:function()
      {
       return this.tree;
      },
      sub:function(x)
      {
       return SetModule.Filter(function(x1)
       {
        return!x.Contains(x1);
       },this);
      }
     },{
      New:function(s)
      {
       return Runtime.New(this,FSharpSet.New1(SetUtil.ofSeq(s)));
      },
      New1:function(tree)
      {
       var r;
       r=Runtime.New(this,{});
       r.tree=tree;
       return r;
      }
     }),
     HashSet:{
      HashSet:Runtime.Class({
       Add:function(item)
       {
        return this.add(item);
       },
       Clear:function()
       {
        this.data=[];
        this.count=0;
        return;
       },
       Contains:function(item)
       {
        var arr;
        arr=this.data[this.hash.call(null,item)];
        return arr==null?false:this.arrContains(item,arr);
       },
       CopyTo:function(arr)
       {
        var i,arr1,idx,item;
        i=0;
        arr1=HashSetUtil.concat(this.data);
        for(idx=0;idx<=arr1.length-1;idx++){
         item=arr1[idx];
         arr[i]=item;
         i=i+1;
        }
        return;
       },
       ExceptWith:function(xs)
       {
        var enumerator;
        enumerator=Enumerator.Get(xs);
        while(enumerator.MoveNext())
         {
          this.Remove(enumerator.get_Current());
         }
        return;
       },
       GetEnumerator:function()
       {
        return Enumerator.Get(HashSetUtil.concat(this.data));
       },
       IntersectWith:function(xs)
       {
        var other,arr,idx,item;
        other=HashSet1.New3(xs,this.equals,this.hash);
        arr=HashSetUtil.concat(this.data);
        for(idx=0;idx<=arr.length-1;idx++){
         item=arr[idx];
         if(!other.Contains(item))
          {
           this.Remove(item);
          }
        }
        return;
       },
       IsProperSubsetOf:function(xs)
       {
        var other;
        other=Arrays.ofSeq(xs);
        return this.count<IntrinsicFunctionProxy.GetLength(other)?this.IsSubsetOf(other):false;
       },
       IsProperSupersetOf:function(xs)
       {
        var other;
        other=Arrays.ofSeq(xs);
        return this.count>IntrinsicFunctionProxy.GetLength(other)?this.IsSupersetOf(other):false;
       },
       IsSubsetOf:function(xs)
       {
        var other;
        other=HashSet1.New3(xs,this.equals,this.hash);
        return Seq.forall(function(arg00)
        {
         return other.Contains(arg00);
        },HashSetUtil.concat(this.data));
       },
       IsSupersetOf:function(xs)
       {
        var x=this;
        return Seq.forall(function(arg00)
        {
         return x.Contains(arg00);
        },xs);
       },
       Overlaps:function(xs)
       {
        var x=this;
        return Seq.exists(function(arg00)
        {
         return x.Contains(arg00);
        },xs);
       },
       Remove:function(item)
       {
        var arr;
        arr=this.data[this.hash.call(null,item)];
        if(arr==null)
         {
          return false;
         }
        else
         {
          if(this.arrRemove(item,arr))
           {
            this.count=this.count-1;
            return true;
           }
          else
           {
            return false;
           }
         }
       },
       RemoveWhere:function(cond)
       {
        var arr,idx,item;
        arr=HashSetUtil.concat(this.data);
        for(idx=0;idx<=arr.length-1;idx++){
         item=arr[idx];
         if(cond(item))
          {
           this.Remove(item);
          }
        }
        return;
       },
       SetEquals:function(xs)
       {
        var other;
        other=HashSet1.New3(xs,this.equals,this.hash);
        return this.get_Count()===other.get_Count()?this.IsSupersetOf(other):false;
       },
       SymmetricExceptWith:function(xs)
       {
        var enumerator,item;
        enumerator=Enumerator.Get(xs);
        while(enumerator.MoveNext())
         {
          item=enumerator.get_Current();
          if(this.Contains(item))
           {
            this.Remove(item);
           }
          else
           {
            this.Add(item);
           }
         }
        return;
       },
       UnionWith:function(xs)
       {
        var enumerator;
        enumerator=Enumerator.Get(xs);
        while(enumerator.MoveNext())
         {
          this.Add(enumerator.get_Current());
         }
        return;
       },
       add:function(item)
       {
        var h,arr;
        h=this.hash.call(null,item);
        arr=this.data[h];
        if(arr==null)
         {
          this.data[h]=[item];
          this.count=this.count+1;
          return true;
         }
        else
         {
          if(this.arrContains(item,arr))
           {
            return false;
           }
          else
           {
            arr.push(item);
            this.count=this.count+1;
            return true;
           }
         }
       },
       arrContains:function(item,arr)
       {
        var c,i,l;
        c=true;
        i=0;
        l=IntrinsicFunctionProxy.GetLength(arr);
        while(c?i<l:false)
         {
          if((this.equals.call(null,arr[i]))(item))
           {
            c=false;
           }
          else
           {
            i=i+1;
           }
         }
        return!c;
       },
       arrRemove:function(item,arr)
       {
        var c,i,l;
        c=true;
        i=0;
        l=IntrinsicFunctionProxy.GetLength(arr);
        while(c?i<l:false)
         {
          if((this.equals.call(null,arr[i]))(item))
           {
            ResizeArray.splice(arr,i,1,[]);
            c=false;
           }
          else
           {
            i=i+1;
           }
         }
        return!c;
       },
       get_Count:function()
       {
        return this.count;
       }
      },{
       New:function(comparer)
       {
        return Runtime.New(this,HashSet1.New3(Seq.empty(),function(x)
        {
         return function(y)
         {
          return comparer.Equals(x,y);
         };
        },function(x)
        {
         return comparer.GetHashCode(x);
        }));
       },
       New1:function(init,comparer)
       {
        return Runtime.New(this,HashSet1.New3(init,function(x)
        {
         return function(y)
         {
          return comparer.Equals(x,y);
         };
        },function(x)
        {
         return comparer.GetHashCode(x);
        }));
       },
       New11:function(init)
       {
        return Runtime.New(this,HashSet1.New3(init,function(x)
        {
         return function(y)
         {
          return Unchecked.Equals(x,y);
         };
        },function(obj)
        {
         return Unchecked.Hash(obj);
        }));
       },
       New2:function()
       {
        return Runtime.New(this,HashSet1.New3(Seq.empty(),function(x)
        {
         return function(y)
         {
          return Unchecked.Equals(x,y);
         };
        },function(obj)
        {
         return Unchecked.Hash(obj);
        }));
       },
       New3:function(init,equals,hash)
       {
        var r,enumerator;
        r=Runtime.New(this,{});
        r.equals=equals;
        r.hash=hash;
        r.data=[];
        r.count=0;
        enumerator=Enumerator.Get(init);
        while(enumerator.MoveNext())
         {
          r.add(enumerator.get_Current());
         }
        return r;
       }
      }),
      HashSetUtil:{
       concat:function($o)
       {
        var $0=this,$this=this;
        var r=[];
        for(var k in $o){
         r.push.apply(r,$o[k]);
        }
        ;
        return r;
       }
      }
     },
     LinkedList:{
      EnumeratorProxy:Runtime.Class({
       Dispose:function()
       {
        return null;
       },
       MoveNext:function()
       {
        this.c=this.c.n;
        return!Unchecked.Equals(this.c,null);
       },
       get_Current:function()
       {
        return this.c.v;
       }
      },{
       New:function(l)
       {
        var r;
        r=Runtime.New(this,{});
        r.c=l;
        return r;
       }
      }),
      ListProxy:Runtime.Class({
       AddAfter:function(after,value)
       {
        var before,node;
        before=after.n;
        node={
         p:after,
         n:before,
         v:value
        };
        if(Unchecked.Equals(after.n,null))
         {
          this.p=node;
         }
        after.n=node;
        if(!Unchecked.Equals(before,null))
         {
          before.p=node;
         }
        this.c=this.c+1;
        return node;
       },
       AddBefore:function(before,value)
       {
        var after,node;
        after=before.p;
        node={
         p:after,
         n:before,
         v:value
        };
        if(Unchecked.Equals(before.p,null))
         {
          this.n=node;
         }
        before.p=node;
        if(!Unchecked.Equals(after,null))
         {
          after.n=node;
         }
        this.c=this.c+1;
        return node;
       },
       AddFirst:function(value)
       {
        var node;
        if(this.c===0)
         {
          node={
           p:null,
           n:null,
           v:value
          };
          this.n=node;
          this.p=this.n;
          this.c=1;
          return node;
         }
        else
         {
          return this.AddBefore(this.n,value);
         }
       },
       AddLast:function(value)
       {
        var node;
        if(this.c===0)
         {
          node={
           p:null,
           n:null,
           v:value
          };
          this.n=node;
          this.p=this.n;
          this.c=1;
          return node;
         }
        else
         {
          return this.AddAfter(this.p,value);
         }
       },
       Clear:function()
       {
        this.c=0;
        this.n=null;
        this.p=null;
        return;
       },
       Contains:function(value)
       {
        var found,node;
        found=false;
        node=this.n;
        while(!Unchecked.Equals(node,null)?!found:false)
         {
          if(node.v==value)
           {
            found=true;
           }
          else
           {
            node=node.n;
           }
         }
        return found;
       },
       Find:function(value)
       {
        var node,notFound;
        node=this.n;
        notFound=true;
        while(notFound?!Unchecked.Equals(node,null):false)
         {
          if(node.v==value)
           {
            notFound=false;
           }
          else
           {
            node=node.n;
           }
         }
        return notFound?null:node;
       },
       FindLast:function(value)
       {
        var node,notFound;
        node=this.p;
        notFound=true;
        while(notFound?!Unchecked.Equals(node,null):false)
         {
          if(node.v==value)
           {
            notFound=false;
           }
          else
           {
            node=node.p;
           }
         }
        return notFound?null:node;
       },
       GetEnumerator:function()
       {
        return EnumeratorProxy.New(this);
       },
       Remove:function(node)
       {
        var before,after;
        before=node.p;
        after=node.n;
        if(Unchecked.Equals(before,null))
         {
          this.n=after;
         }
        else
         {
          before.n=after;
         }
        if(Unchecked.Equals(after,null))
         {
          this.p=before;
         }
        else
         {
          after.p=before;
         }
        this.c=this.c-1;
        return;
       },
       Remove1:function(value)
       {
        var node;
        node=this.Find(value);
        if(Unchecked.Equals(node,null))
         {
          return false;
         }
        else
         {
          this.Remove(node);
          return true;
         }
       },
       RemoveFirst:function()
       {
        return this.Remove(this.n);
       },
       RemoveLast:function()
       {
        return this.Remove(this.p);
       },
       get_Count:function()
       {
        return this.c;
       },
       get_First:function()
       {
        return this.n;
       },
       get_Last:function()
       {
        return this.p;
       }
      },{
       New:function()
       {
        return Runtime.New(this,ListProxy.New1(Seq.empty()));
       },
       New1:function(coll)
       {
        var r,ie,node;
        r=Runtime.New(this,{});
        r.c=0;
        r.n=null;
        r.p=null;
        ie=Enumerator.Get(coll);
        if(ie.MoveNext())
         {
          r.n={
           p:null,
           n:null,
           v:ie.get_Current()
          };
          r.p=r.n;
          r.c=1;
         }
        while(ie.MoveNext())
         {
          node={
           p:r.p,
           n:null,
           v:ie.get_Current()
          };
          r.p.n=node;
          r.p=node;
          r.c=r.c+1;
         }
        return r;
       }
      })
     },
     MapModule:{
      Exists:function(f,m)
      {
       return Seq.exists(function(kv)
       {
        return(f(kv.K))(kv.V);
       },m);
      },
      Filter:function(f,m)
      {
       var x;
       x=Seq.toArray(Seq.filter(function(kv)
       {
        return(f(kv.Key))(kv.Value);
       },BalancedTree.Enumerate(false,m.get_Tree())));
       return FSharpMap.New1(BalancedTree.Build(x,0,x.length-1));
      },
      FindKey:function(f,m)
      {
       return Seq.pick(function(kv)
       {
        return(f(kv.K))(kv.V)?{
         $:1,
         $0:kv.K
        }:{
         $:0
        };
       },m);
      },
      Fold:function(f,s,m)
      {
       return Seq.fold(function(s1)
       {
        return function(kv)
        {
         return((f(s1))(kv.Key))(kv.Value);
        };
       },s,BalancedTree.Enumerate(false,m.get_Tree()));
      },
      FoldBack:function(f,m,s)
      {
       return Seq.fold(function(s1)
       {
        return function(kv)
        {
         return((f(kv.Key))(kv.Value))(s1);
        };
       },s,BalancedTree.Enumerate(true,m.get_Tree()));
      },
      ForAll:function(f,m)
      {
       return Seq.forall(function(kv)
       {
        return(f(kv.K))(kv.V);
       },m);
      },
      Iterate:function(f,m)
      {
       return Seq.iter(function(kv)
       {
        return(f(kv.K))(kv.V);
       },m);
      },
      Map:function(f,m)
      {
       return FSharpMap.New1(BalancedTree.OfSeq(Seq.map(function(kv)
       {
        return Runtime.New(Pair,{
         Key:kv.Key,
         Value:(f(kv.Key))(kv.Value)
        });
       },BalancedTree.Enumerate(false,m.get_Tree()))));
      },
      OfArray:function(a)
      {
       return FSharpMap.New1(BalancedTree.OfSeq(Seq.map(Runtime.Tupled(function(tupledArg)
       {
        return Runtime.New(Pair,{
         Key:tupledArg[0],
         Value:tupledArg[1]
        });
       }),a)));
      },
      Partition:function(f,m)
      {
       var patternInput,y,x;
       patternInput=Arrays.partition(function(kv)
       {
        return(f(kv.Key))(kv.Value);
       },Seq.toArray(BalancedTree.Enumerate(false,m.get_Tree())));
       y=patternInput[1];
       x=patternInput[0];
       return[FSharpMap.New1(BalancedTree.Build(x,0,x.length-1)),FSharpMap.New1(BalancedTree.Build(y,0,y.length-1))];
      },
      Pick:function(f,m)
      {
       return Seq.pick(function(kv)
       {
        return(f(kv.K))(kv.V);
       },m);
      },
      ToSeq:function(m)
      {
       return Seq.map(function(kv)
       {
        return[kv.Key,kv.Value];
       },BalancedTree.Enumerate(false,m.get_Tree()));
      },
      TryFind:function(k,m)
      {
       return m.TryFind(k);
      },
      TryFindKey:function(f,m)
      {
       return Seq.tryPick(function(kv)
       {
        return(f(kv.K))(kv.V)?{
         $:1,
         $0:kv.K
        }:{
         $:0
        };
       },m);
      },
      TryPick:function(f,m)
      {
       return Seq.tryPick(function(kv)
       {
        return(f(kv.K))(kv.V);
       },m);
      }
     },
     MapUtil:{
      fromSeq:function(s)
      {
       var a;
       a=Seq.toArray(Seq.delay(function()
       {
        return Seq.collect(Runtime.Tupled(function(matchValue)
        {
         return[Runtime.New(Pair,{
          Key:matchValue[0],
          Value:matchValue[1]
         })];
        }),Seq.distinctBy(Runtime.Tupled(function(tuple)
        {
         return tuple[0];
        }),s));
       }));
       Arrays.sortInPlace(a);
       return BalancedTree.Build(a,0,a.length-1);
      }
     },
     Pair:Runtime.Class({
      CompareTo:function(other)
      {
       return Operators.Compare(this.Key,other.Key);
      },
      Equals:function(other)
      {
       return Unchecked.Equals(this.Key,other.Key);
      },
      GetHashCode:function()
      {
       return Unchecked.Hash(this.Key);
      }
     }),
     ResizeArray:{
      ResizeArrayProxy:Runtime.Class({
       Add:function(x)
       {
        return this.arr.push(x);
       },
       AddRange:function(x)
       {
        var _this=this;
        return Seq.iter(function(arg00)
        {
         return _this.Add(arg00);
        },x);
       },
       Clear:function()
       {
        ResizeArray.splice(this.arr,0,IntrinsicFunctionProxy.GetLength(this.arr),[]);
       },
       CopyTo:function(arr)
       {
        return this.CopyTo1(arr,0);
       },
       CopyTo1:function(arr,offset)
       {
        return this.CopyTo2(0,arr,offset,this.get_Count());
       },
       CopyTo2:function(index,target,offset,count)
       {
        return Arrays.blit(this.arr,index,target,offset,count);
       },
       GetEnumerator:function()
       {
        return Enumerator.Get(this.arr);
       },
       GetRange:function(index,count)
       {
        return ResizeArrayProxy.New(Arrays.sub(this.arr,index,count));
       },
       Insert:function(index,items)
       {
        ResizeArray.splice(this.arr,index,0,[items]);
       },
       InsertRange:function(index,items)
       {
        ResizeArray.splice(this.arr,index,0,Seq.toArray(items));
       },
       RemoveAt:function(x)
       {
        ResizeArray.splice(this.arr,x,1,[]);
       },
       RemoveRange:function(index,count)
       {
        ResizeArray.splice(this.arr,index,count,[]);
       },
       Reverse:function()
       {
        return this.arr.reverse();
       },
       Reverse1:function(index,count)
       {
        return Arrays.reverse(this.arr,index,count);
       },
       ToArray:function()
       {
        return this.arr.slice();
       },
       get_Count:function()
       {
        return IntrinsicFunctionProxy.GetLength(this.arr);
       },
       get_Item:function(x)
       {
        return this.arr[x];
       },
       set_Item:function(x,v)
       {
        this.arr[x]=v;
       }
      },{
       New:function(arr)
       {
        var r;
        r=Runtime.New(this,{});
        r.arr=arr;
        return r;
       },
       New1:function()
       {
        return Runtime.New(this,ResizeArrayProxy.New([]));
       },
       New11:function(el)
       {
        return Runtime.New(this,ResizeArrayProxy.New(Seq.toArray(el)));
       },
       New2:function()
       {
        return Runtime.New(this,ResizeArrayProxy.New([]));
       }
      }),
      splice:function($arr,$index,$howMany,$items)
      {
       var $0=this,$this=this;
       return Global.Array.prototype.splice.apply($arr,[$index,$howMany].concat($items));
      }
     },
     SetModule:{
      Filter:function(f,s)
      {
       var data;
       data=Seq.toArray(Seq.filter(f,s));
       return FSharpSet.New1(BalancedTree.Build(data,0,data.length-1));
      },
      FoldBack:function(f,a,s)
      {
       return Seq.fold(function(s1)
       {
        return function(x)
        {
         return(f(x))(s1);
        };
       },s,BalancedTree.Enumerate(true,a.get_Tree()));
      },
      Partition:function(f,a)
      {
       var patternInput,y;
       patternInput=Arrays.partition(f,Seq.toArray(a));
       y=patternInput[1];
       return[FSharpSet.New1(BalancedTree.OfSeq(patternInput[0])),FSharpSet.New1(BalancedTree.OfSeq(y))];
      }
     },
     SetUtil:{
      ofSeq:function(s)
      {
       var a;
       a=Seq.toArray(s);
       Arrays.sortInPlace(a);
       return BalancedTree.Build(a,0,a.length-1);
      }
     }
    }
   }
  }
 });
 Runtime.OnInit(function()
 {
  WebSharper=Runtime.Safe(Global.IntelliFactory.WebSharper);
  Collections=Runtime.Safe(WebSharper.Collections);
  BalancedTree=Runtime.Safe(Collections.BalancedTree);
  Operators=Runtime.Safe(WebSharper.Operators);
  Seq=Runtime.Safe(WebSharper.Seq);
  List=Runtime.Safe(WebSharper.List);
  T=Runtime.Safe(List.T);
  Arrays=Runtime.Safe(WebSharper.Arrays);
  IntrinsicFunctionProxy=Runtime.Safe(WebSharper.IntrinsicFunctionProxy);
  Enumerator=Runtime.Safe(WebSharper.Enumerator);
  JavaScript=Runtime.Safe(WebSharper.JavaScript);
  DictionaryUtil=Runtime.Safe(Collections.DictionaryUtil);
  Dictionary=Runtime.Safe(Collections.Dictionary);
  Unchecked=Runtime.Safe(WebSharper.Unchecked);
  FSharpMap=Runtime.Safe(Collections.FSharpMap);
  Pair=Runtime.Safe(Collections.Pair);
  Option=Runtime.Safe(WebSharper.Option);
  MapUtil=Runtime.Safe(Collections.MapUtil);
  FSharpSet=Runtime.Safe(Collections.FSharpSet);
  SetModule=Runtime.Safe(Collections.SetModule);
  SetUtil=Runtime.Safe(Collections.SetUtil);
  HashSet=Runtime.Safe(Collections.HashSet);
  HashSetUtil=Runtime.Safe(HashSet.HashSetUtil);
  HashSet1=Runtime.Safe(HashSet.HashSet);
  ResizeArray=Runtime.Safe(Collections.ResizeArray);
  LinkedList=Runtime.Safe(Collections.LinkedList);
  EnumeratorProxy=Runtime.Safe(LinkedList.EnumeratorProxy);
  ListProxy=Runtime.Safe(LinkedList.ListProxy);
  return ResizeArrayProxy=Runtime.Safe(ResizeArray.ResizeArrayProxy);
 });
 Runtime.OnLoad(function()
 {
  return;
 });
}());

(function()
{
 var Global=this,Runtime=this.IntelliFactory.Runtime,Reactive,Disposable,HotStream,WebSharper,Control,FSharpEvent,Observer,Observable,Util,Collections,Dictionary,Operators,Seq,Reactive1,Reactive2,List,T;
 Runtime.Define(Global,{
  IntelliFactory:{
   Reactive:{
    Disposable:Runtime.Class({
     Dispose:function()
     {
      return this.Dispose1.call(null,null);
     }
    },{
     New:function(d)
     {
      return Runtime.New(Disposable,{
       Dispose1:d
      });
     }
    }),
    HotStream:Runtime.Class({
     Subscribe:function(o)
     {
      if(this.Latest.contents.$==1)
       {
        o.OnNext(this.Latest.contents.$0);
       }
      return this.Event.event.Subscribe(o);
     },
     Trigger:function(v)
     {
      this.Latest.contents={
       $:1,
       $0:v
      };
      return this.Event.event.Trigger(v);
     }
    },{
     New:function(x)
     {
      return Runtime.New(HotStream,{
       Latest:{
        contents:{
         $:1,
         $0:x
        }
       },
       Event:FSharpEvent.New()
      });
     },
     New1:function()
     {
      return Runtime.New(HotStream,{
       Latest:{
        contents:{
         $:0
        }
       },
       Event:FSharpEvent.New()
      });
     }
    }),
    Observable:Runtime.Class({
     Subscribe:function(o)
     {
      return this.OnSubscribe.call(null,o);
     },
     SubscribeWith:function(onNext,onComplete)
     {
      return this.OnSubscribe.call(null,Observer.New(onNext,onComplete));
     }
    },{
     New:function(f)
     {
      return Runtime.New(Observable,{
       OnSubscribe:f
      });
     }
    }),
    Observer:Runtime.Class({
     OnCompleted:function()
     {
      return this.OnCompleted1.call(null,null);
     },
     OnError:function()
     {
      return null;
     },
     OnNext:function(t)
     {
      return this.OnNext1.call(null,t);
     }
    },{
     New:function(onNext,onComplete)
     {
      return Runtime.New(Observer,{
       OnNext1:onNext,
       OnCompleted1:onComplete
      });
     }
    }),
    Reactive:{
     Aggregate:function(io,seed,acc)
     {
      return Observable.New(function(o)
      {
       var state;
       state={
        contents:seed
       };
       return Util.subscribeTo(io,function(value)
       {
        state.contents=(acc(state.contents))(value);
        return o.OnNext(state.contents);
       });
      });
     },
     Choose:function(io,f)
     {
      return Observable.New(function(o1)
      {
       return Util.subscribeTo(io,function(v)
       {
        var matchValue;
        matchValue=f(v);
        return matchValue.$==0?null:o1.OnNext(matchValue.$0);
       });
      });
     },
     CollectLatest:function(outer)
     {
      return Observable.New(function(o)
      {
       var dict,index;
       dict=Dictionary.New2();
       index={
        contents:0
       };
       return Util.subscribeTo(outer,function(inner)
       {
        var currentIndex;
        Operators.Increment(index);
        currentIndex=index.contents;
        Util.subscribeTo(inner,function(value)
        {
         dict.set_Item(currentIndex,value);
         return o.OnNext(Seq.delay(function()
         {
          return Seq.map(function(pair)
          {
           return pair.V;
          },dict);
         }));
        });
        return;
       });
      });
     },
     CombineLatest:function(io1,io2,f)
     {
      return Observable.New(function(o)
      {
       var lv1,lv2,update,o1,o2,d1,d2;
       lv1={
        contents:{
         $:0
        }
       };
       lv2={
        contents:{
         $:0
        }
       };
       update=function()
       {
        var matchValue,v2;
        matchValue=[lv1.contents,lv2.contents];
        if(matchValue[0].$==1)
         {
          if(matchValue[1].$==1)
           {
            v2=matchValue[1].$0;
            return o.OnNext((f(matchValue[0].$0))(v2));
           }
          else
           {
            return null;
           }
         }
        else
         {
          return null;
         }
       };
       o1=Observer.New(function(x)
       {
        lv1.contents={
         $:1,
         $0:x
        };
        return update(null);
       },function()
       {
       });
       o2=Observer.New(function(y)
       {
        lv2.contents={
         $:1,
         $0:y
        };
        return update(null);
       },function()
       {
       });
       d1=io1.Subscribe(o1);
       d2=io2.Subscribe(o2);
       return Disposable.New(function()
       {
        d1.Dispose();
        return d2.Dispose();
       });
      });
     },
     Concat:function(io1,io2)
     {
      return Observable.New(function(o)
      {
       var innerDisp,outerDisp;
       innerDisp={
        contents:{
         $:0
        }
       };
       outerDisp=io1.Subscribe(Observer.New(function(arg00)
       {
        return o.OnNext(arg00);
       },function()
       {
        innerDisp.contents={
         $:1,
         $0:io2.Subscribe(o)
        };
       }));
       return Disposable.New(function()
       {
        if(innerDisp.contents.$==1)
         {
          innerDisp.contents.$0.Dispose();
         }
        return outerDisp.Dispose();
       });
      });
     },
     Default:Runtime.Field(function()
     {
      return Reactive2.New();
     }),
     Drop:function(io,count)
     {
      return Observable.New(function(o1)
      {
       var index;
       index={
        contents:0
       };
       return Util.subscribeTo(io,function(v)
       {
        Operators.Increment(index);
        return index.contents>count?o1.OnNext(v):null;
       });
      });
     },
     Heat:function(io)
     {
      var s;
      s=HotStream.New1();
      Util.subscribeTo(io,function(arg00)
      {
       return s.Trigger(arg00);
      });
      return s;
     },
     Merge:function(io1,io2)
     {
      return Observable.New(function(o)
      {
       var completed1,completed2,disp1,disp2;
       completed1={
        contents:false
       };
       completed2={
        contents:false
       };
       disp1=io1.Subscribe(Observer.New(function(arg00)
       {
        return o.OnNext(arg00);
       },function()
       {
        completed1.contents=true;
        return(completed1.contents?completed2.contents:false)?o.OnCompleted():null;
       }));
       disp2=io2.Subscribe(Observer.New(function(arg00)
       {
        return o.OnNext(arg00);
       },function()
       {
        completed2.contents=true;
        return(completed1.contents?completed2.contents:false)?o.OnCompleted():null;
       }));
       return Disposable.New(function()
       {
        disp1.Dispose();
        return disp2.Dispose();
       });
      });
     },
     Never:function()
     {
      return Observable.New(function()
      {
       return Disposable.New(function()
       {
       });
      });
     },
     Range:function(start,count)
     {
      return Observable.New(function(o)
      {
       var i;
       for(i=start;i<=start+count;i++){
        o.OnNext(i);
       }
       return Disposable.New(function()
       {
       });
      });
     },
     Reactive:Runtime.Class({
      Aggregate:function(io,s,a)
      {
       return Reactive1.Aggregate(io,s,a);
      },
      Choose:function(io,f)
      {
       return Reactive1.Choose(io,f);
      },
      CollectLatest:function(io)
      {
       return Reactive1.CollectLatest(io);
      },
      CombineLatest:function(io1,io2,f)
      {
       return Reactive1.CombineLatest(io1,io2,f);
      },
      Concat:function(io1,io2)
      {
       return Reactive1.Concat(io1,io2);
      },
      Drop:function(io,count)
      {
       return Reactive1.Drop(io,count);
      },
      Heat:function(io)
      {
       return Reactive1.Heat(io);
      },
      Merge:function(io1,io2)
      {
       return Reactive1.Merge(io1,io2);
      },
      Never:function()
      {
       return Reactive1.Never();
      },
      Return:function(x)
      {
       return Reactive1.Return(x);
      },
      Select:function(io,f)
      {
       return Reactive1.Select(io,f);
      },
      SelectMany:function(io)
      {
       return Reactive1.SelectMany(io);
      },
      Sequence:function(ios)
      {
       return Reactive1.Sequence(ios);
      },
      Switch:function(io)
      {
       return Reactive1.Switch(io);
      },
      Where:function(io,f)
      {
       return Reactive1.Where(io,f);
      }
     },{
      New:function()
      {
       return Runtime.New(this,{});
      }
     }),
     Return:function(x)
     {
      return Observable.New(function(o)
      {
       o.OnNext(x);
       o.OnCompleted();
       return Disposable.New(function()
       {
       });
      });
     },
     Select:function(io,f)
     {
      return Observable.New(function(o1)
      {
       return Util.subscribeTo(io,function(v)
       {
        return o1.OnNext(f(v));
       });
      });
     },
     SelectMany:function(io)
     {
      return Observable.New(function(o)
      {
       var disp,d;
       disp={
        contents:function()
        {
        }
       };
       d=Util.subscribeTo(io,function(o1)
       {
        var d1;
        d1=Util.subscribeTo(o1,function(arg00)
        {
         return o.OnNext(arg00);
        });
        disp.contents=function()
        {
         disp.contents.call(null,null);
         return d1.Dispose();
        };
        return;
       });
       return Disposable.New(function()
       {
        disp.contents.call(null,null);
        return d.Dispose();
       });
      });
     },
     Sequence:function(ios)
     {
      var sequence;
      sequence=function(ios1)
      {
       return ios1.$==1?Reactive1.CombineLatest(ios1.$0,sequence(ios1.$1),function(x)
       {
        return function(y)
        {
         return Runtime.New(T,{
          $:1,
          $0:x,
          $1:y
         });
        };
       }):Reactive1.Return(Runtime.New(T,{
        $:0
       }));
      };
      return Reactive1.Select(sequence(List.ofSeq(ios)),function(source)
      {
       return source;
      });
     },
     Switch:function(io)
     {
      return Observable.New(function(o)
      {
       var index,disp;
       index={
        contents:0
       };
       disp={
        contents:{
         $:0
        }
       };
       return Util.subscribeTo(io,function(o1)
       {
        var currentIndex;
        Operators.Increment(index);
        if(disp.contents.$==1)
         {
          disp.contents.$0.Dispose();
         }
        currentIndex=index.contents;
        disp.contents={
         $:1,
         $0:Util.subscribeTo(o1,function(v)
         {
          return currentIndex===index.contents?o.OnNext(v):null;
         })
        };
        return;
       });
      });
     },
     Where:function(io,f)
     {
      return Observable.New(function(o1)
      {
       return Util.subscribeTo(io,function(v)
       {
        return f(v)?o1.OnNext(v):null;
       });
      });
     }
    }
   }
  }
 });
 Runtime.OnInit(function()
 {
  Reactive=Runtime.Safe(Global.IntelliFactory.Reactive);
  Disposable=Runtime.Safe(Reactive.Disposable);
  HotStream=Runtime.Safe(Reactive.HotStream);
  WebSharper=Runtime.Safe(Global.IntelliFactory.WebSharper);
  Control=Runtime.Safe(WebSharper.Control);
  FSharpEvent=Runtime.Safe(Control.FSharpEvent);
  Observer=Runtime.Safe(Reactive.Observer);
  Observable=Runtime.Safe(Reactive.Observable);
  Util=Runtime.Safe(WebSharper.Util);
  Collections=Runtime.Safe(WebSharper.Collections);
  Dictionary=Runtime.Safe(Collections.Dictionary);
  Operators=Runtime.Safe(WebSharper.Operators);
  Seq=Runtime.Safe(WebSharper.Seq);
  Reactive1=Runtime.Safe(Reactive.Reactive);
  Reactive2=Runtime.Safe(Reactive1.Reactive);
  List=Runtime.Safe(WebSharper.List);
  return T=Runtime.Safe(List.T);
 });
 Runtime.OnLoad(function()
 {
  Reactive1.Default();
  return;
 });
}());

(function()
{
 var Global=this,Runtime=this.IntelliFactory.Runtime,Formlet,Base,Formlet1,Form,Tree,Edit,Result,WebSharper,List,T,LayoutUtils,Tree1,Util,Seq,Enumerator,Unchecked;
 Runtime.Define(Global,{
  IntelliFactory:{
   Formlet:{
    Base:{
     D:Runtime.Class({
      Dispose:function()
      {
       return null;
      }
     },{
      New:function()
      {
       return Runtime.New(this,{});
      }
     }),
     Form:Runtime.Class({
      Dispose:function()
      {
       return this.Dispose1.call(null,null);
      }
     }),
     Formlet:Runtime.Class({
      Build:function()
      {
       return this.Build1.call(null,null);
      },
      MapResult:function(f)
      {
       var _this=this;
       return Runtime.New(Formlet1,{
        Layout:this.Layout,
        Build1:function()
        {
         var form;
         form=_this.Build1.call(null,null);
         _this.Utils.Reactive.Select(form.State,function(x)
         {
          return f(x);
         });
         return Runtime.New(Form,{
          Body:form.Body,
          Dispose1:form.Dispose1,
          Notify:form.Notify,
          State:form.State
         });
        },
        Utils:_this.Utils
       });
      },
      get_Layout:function()
      {
       return this.Layout;
      }
     }),
     FormletBuilder:Runtime.Class({
      Bind:function(x,f)
      {
       return this.F.Bind(x,f);
      },
      Delay:function(f)
      {
       return this.F.Delay(f);
      },
      Return:function(x)
      {
       return this.F.Return(x);
      },
      ReturnFrom:function(f)
      {
       return f;
      }
     },{
      New:function(F)
      {
       var r;
       r=Runtime.New(this,{});
       r.F=F;
       return r;
      }
     }),
     FormletProvider:Runtime.Class({
      AppendLayout:function(layout,formlet)
      {
       return this.WithLayout(layout,this.ApplyLayout(formlet));
      },
      Apply:function(f,x)
      {
       var _this=this;
       return this.New(function()
       {
        var f1,x1,objectArg,arg00;
        f1=_this.BuildForm(f);
        x1=_this.BuildForm(x);
        objectArg=_this.U.Reactive;
        arg00=f1.Body;
        return Runtime.New(Form,{
         Body:_this.U.Reactive.Merge(objectArg.Select(arg00,function(arg0)
         {
          return Runtime.New(Edit,{
           $:1,
           $0:arg0
          });
         }),_this.U.Reactive.Select(x1.Body,function(arg0)
         {
          return Runtime.New(Edit,{
           $:2,
           $0:arg0
          });
         })),
         Dispose1:function()
         {
          x1.Dispose1.call(null,null);
          return f1.Dispose1.call(null,null);
         },
         Notify:function(o)
         {
          x1.Notify.call(null,o);
          return f1.Notify.call(null,o);
         },
         State:_this.U.Reactive.CombineLatest(x1.State,f1.State,function(r)
         {
          return function(f2)
          {
           return Result.Apply(f2,r);
          };
         })
        });
       });
      },
      ApplyLayout:function(formlet)
      {
       var _this=this;
       return this.New(function()
       {
        var form,matchValue;
        form=formlet.Build();
        matchValue=formlet.get_Layout().Apply.call(null,form.Body);
        return Runtime.New(Form,{
         Body:matchValue.$==0?form.Body:_this.U.Reactive.Return(Tree.Set(matchValue.$0[0])),
         Dispose1:form.Dispose1,
         Notify:form.Notify,
         State:form.State
        });
       });
      },
      Bind:function(formlet,f)
      {
       return this.Join(this.Map(f,formlet));
      },
      BindWith:function(hF,formlet,f)
      {
       var _this=this;
       return this.New(function()
       {
        var formlet1,form,objectArg,x,left,objectArg1,x1,right,matchValue,_,bRight;
        formlet1=_this.Bind(formlet,f);
        form=formlet1.Build();
        objectArg=_this.U.Reactive;
        x=objectArg.Where(form.Body,function(edit)
        {
         return edit.$==1?true:false;
        });
        left=_this.U.DefaultLayout.Apply.call(null,x);
        objectArg1=_this.U.Reactive;
        x1=objectArg1.Where(form.Body,function(edit)
        {
         return edit.$==2?true:false;
        });
        right=_this.U.DefaultLayout.Apply.call(null,x1);
        matchValue=[left,right];
        if(matchValue[0].$==1)
         {
          if(matchValue[1].$==1)
           {
            bRight=matchValue[1].$0[0];
            _=_this.U.Reactive.Return(Tree.Set((hF(matchValue[0].$0[0]))(bRight)));
           }
          else
           {
            _=_this.U.Reactive.Never();
           }
         }
        else
         {
          _=_this.U.Reactive.Never();
         }
        return Runtime.New(Form,{
         Body:_,
         Dispose1:form.Dispose1,
         Notify:form.Notify,
         State:form.State
        });
       });
      },
      BuildForm:function(formlet)
      {
       var form,matchValue,d;
       form=formlet.Build();
       matchValue=formlet.get_Layout().Apply.call(null,form.Body);
       if(matchValue.$==1)
        {
         d=matchValue.$0[1];
         return Runtime.New(Form,{
          Body:this.U.Reactive.Return(Tree.Set(matchValue.$0[0])),
          Dispose1:function()
          {
           form.Dispose1.call(null,null);
           return d.Dispose();
          },
          Notify:form.Notify,
          State:form.State
         });
        }
       else
        {
         return form;
        }
      },
      Delay:function(f)
      {
       var Build,_this=this;
       Build=function()
       {
        return _this.BuildForm(f(null));
       };
       return Runtime.New(Formlet1,{
        Layout:_this.L.Delay(function()
        {
         return f(null).get_Layout();
        }),
        Build1:Build,
        Utils:_this.U
       });
      },
      Deletable:function(formlet)
      {
       var _this=this;
       return this.Replace(formlet,function(value)
       {
        return value.$==1?_this.Return({
         $:1,
         $0:value.$0
        }):_this.ReturnEmpty({
         $:0
        });
       });
      },
      Empty:function()
      {
       var _this=this;
       return this.New(function()
       {
        return Runtime.New(Form,{
         Body:_this.U.Reactive.Return(Tree.Delete()),
         Dispose1:function()
         {
         },
         Notify:function()
         {
         },
         State:_this.U.Reactive.Never()
        });
       });
      },
      EmptyForm:function()
      {
       return Runtime.New(Form,{
        Body:this.U.Reactive.Never(),
        Dispose1:function()
        {
        },
        Notify:function()
        {
        },
        State:this.U.Reactive.Never()
       });
      },
      Fail:function(fs)
      {
       return Runtime.New(Form,{
        Body:this.U.Reactive.Never(),
        Dispose1:function(x)
        {
         return x;
        },
        Notify:function()
        {
        },
        State:this.U.Reactive.Return(Runtime.New(Result,{
         $:1,
         $0:fs
        }))
       });
      },
      FailWith:function(fs)
      {
       var _this=this;
       return this.New(function()
       {
        return _this.Fail(fs);
       });
      },
      FlipBody:function(formlet)
      {
       var arg10,_this=this;
       arg10=this.New(function()
       {
        var form;
        form=formlet.Build();
        return Runtime.New(Form,{
         Body:_this.U.Reactive.Select(form.Body,function(edit)
         {
          return Tree.FlipEdit(edit);
         }),
         Dispose1:form.Dispose1,
         Notify:form.Notify,
         State:form.State
        });
       });
       return _this.WithLayout(formlet.get_Layout(),arg10);
      },
      FromState:function(state)
      {
       var _this=this;
       return this.New(function()
       {
        return Runtime.New(Form,{
         Body:_this.U.Reactive.Never(),
         Dispose1:function()
         {
         },
         Notify:function()
         {
         },
         State:state
        });
       });
      },
      InitWith:function(value,formlet)
      {
       var arg10,_this=this;
       arg10=this.New(function()
       {
        var form,arg101;
        form=formlet.Build();
        arg101=form.State;
        return Runtime.New(Form,{
         Body:form.Body,
         Dispose1:form.Dispose1,
         Notify:form.Notify,
         State:_this.U.Reactive.Concat(_this.U.Reactive.Return(Runtime.New(Result,{
          $:0,
          $0:value
         })),arg101)
        });
       });
       return _this.WithLayout(formlet.get_Layout(),arg10);
      },
      InitWithFailure:function(formlet)
      {
       var arg10,_this=this;
       arg10=this.New(function()
       {
        var form,arg101;
        form=formlet.Build();
        arg101=form.State;
        return Runtime.New(Form,{
         Body:form.Body,
         Dispose1:form.Dispose1,
         Notify:form.Notify,
         State:_this.U.Reactive.Concat(_this.U.Reactive.Return(Runtime.New(Result,{
          $:1,
          $0:Runtime.New(T,{
           $:0
          })
         })),arg101)
        });
       });
       return _this.WithLayout(formlet.get_Layout(),arg10);
      },
      Join:function(formlet)
      {
       var _this=this;
       return this.New(function()
       {
        var form1,objectArg,x,objectArg1,formStream,objectArg2,arg10,right;
        form1=_this.BuildForm(formlet);
        objectArg=_this.U.Reactive;
        x=objectArg.Select(form1.State,function(res)
        {
         return res.$==1?_this.Fail(res.$0):_this.BuildForm(res.$0);
        });
        objectArg1=_this.U.Reactive;
        formStream=objectArg1.Heat(x);
        objectArg2=_this.U.Reactive;
        arg10=function(arg0)
        {
         return Runtime.New(Edit,{
          $:2,
          $0:arg0
         });
        };
        right=_this.U.Reactive.Select(_this.U.Reactive.Switch(objectArg2.Select(formStream,function(f)
        {
         var arg101;
         arg101=f.Body;
         return _this.U.Reactive.Concat(_this.U.Reactive.Return(Tree.Delete()),arg101);
        })),arg10);
        return Runtime.New(Form,{
         Body:_this.U.Reactive.Merge(_this.U.Reactive.Select(form1.Body,function(arg0)
         {
          return Runtime.New(Edit,{
           $:1,
           $0:arg0
          });
         }),right),
         Dispose1:function()
         {
          return form1.Dispose1.call(null,null);
         },
         Notify:function(o)
         {
          return form1.Notify.call(null,o);
         },
         State:_this.U.Reactive.Switch(_this.U.Reactive.Select(formStream,function(f)
         {
          return f.State;
         }))
        });
       });
      },
      LiftResult:function(formlet)
      {
       return this.MapResult(function(arg0)
       {
        return Runtime.New(Result,{
         $:0,
         $0:arg0
        });
       },formlet);
      },
      Map:function(f,formlet)
      {
       return this.MapResult(function(arg10)
       {
        return Result.Map(f,arg10);
       },formlet);
      },
      MapBody:function(f,formlet)
      {
       var _this=this;
       return this.WithLayout({
        Apply:function(o)
        {
         var matchValue,matchValue1,d,d1;
         matchValue=formlet.get_Layout().Apply.call(null,o);
         if(matchValue.$==0)
          {
           matchValue1=_this.U.DefaultLayout.Apply.call(null,o);
           if(matchValue1.$==0)
            {
             return{
              $:0
             };
            }
           else
            {
             d=matchValue1.$0[1];
             return{
              $:1,
              $0:[f(matchValue1.$0[0]),d]
             };
            }
          }
         else
          {
           d1=matchValue.$0[1];
           return{
            $:1,
            $0:[f(matchValue.$0[0]),d1]
           };
          }
        }
       },formlet);
      },
      MapResult:function(f,formlet)
      {
       var Build,_this=this;
       Build=function()
       {
        var form;
        form=formlet.Build();
        return Runtime.New(Form,{
         Body:form.Body,
         Dispose1:form.Dispose1,
         Notify:form.Notify,
         State:_this.U.Reactive.Select(form.State,function(x)
         {
          return f(x);
         })
        });
       };
       return Runtime.New(Formlet1,{
        Layout:formlet.get_Layout(),
        Build1:Build,
        Utils:_this.U
       });
      },
      Never:function()
      {
       var _this=this;
       return this.New(function()
       {
        return Runtime.New(Form,{
         Body:_this.U.Reactive.Never(),
         Dispose1:function()
         {
         },
         Notify:function()
         {
         },
         State:_this.U.Reactive.Never()
        });
       });
      },
      New:function(build)
      {
       return Runtime.New(Formlet1,{
        Layout:this.L.Default(),
        Build1:build,
        Utils:this.U
       });
      },
      Replace:function(formlet,f)
      {
       return this.Switch(this.Map(function(value)
       {
        return f(value);
       },formlet));
      },
      ReplaceFirstWithFailure:function(formlet)
      {
       var arg10,_this=this;
       arg10=this.New(function()
       {
        var form,state;
        form=formlet.Build();
        state=_this.U.Reactive.Drop(form.State,1);
        return Runtime.New(Form,{
         Body:form.Body,
         Dispose1:form.Dispose1,
         Notify:form.Notify,
         State:_this.U.Reactive.Concat(_this.U.Reactive.Return(Runtime.New(Result,{
          $:1,
          $0:Runtime.New(T,{
           $:0
          })
         })),state)
        });
       });
       return _this.WithLayout(formlet.get_Layout(),arg10);
      },
      Return:function(x)
      {
       var _this=this;
       return this.New(function()
       {
        return Runtime.New(Form,{
         Body:_this.U.Reactive.Never(),
         Dispose1:function(x1)
         {
          return x1;
         },
         Notify:function()
         {
         },
         State:_this.U.Reactive.Return(Runtime.New(Result,{
          $:0,
          $0:x
         }))
        });
       });
      },
      ReturnEmpty:function(x)
      {
       var _this=this;
       return this.New(function()
       {
        return Runtime.New(Form,{
         Body:_this.U.Reactive.Return(Tree.Delete()),
         Dispose1:function(x1)
         {
          return x1;
         },
         Notify:function()
         {
         },
         State:_this.U.Reactive.Return(Runtime.New(Result,{
          $:0,
          $0:x
         }))
        });
       });
      },
      SelectMany:function(formlet)
      {
       var _this=this;
       return this.New(function()
       {
        var form1,objectArg,x,objectArg1,formStream,objectArg2,arg00,left,tag,arg10;
        form1=_this.BuildForm(formlet);
        objectArg=_this.U.Reactive;
        x=objectArg.Choose(form1.State,function(res)
        {
         return res.$==1?{
          $:0
         }:{
          $:1,
          $0:_this.BuildForm(res.$0)
         };
        });
        objectArg1=_this.U.Reactive;
        formStream=objectArg1.Heat(x);
        objectArg2=_this.U.Reactive;
        arg00=form1.Body;
        left=objectArg2.Select(arg00,function(arg0)
        {
         return Runtime.New(Edit,{
          $:1,
          $0:arg0
         });
        });
        tag={
         contents:function(arg0)
         {
          return Runtime.New(Edit,{
           $:1,
           $0:arg0
          });
         }
        };
        arg10=function(arg001)
        {
         return Result.Sequence(arg001);
        };
        return Runtime.New(Form,{
         Body:_this.U.Reactive.Merge(left,_this.U.Reactive.SelectMany(_this.U.Reactive.Select(formStream,function(f)
         {
          var g;
          g=tag.contents;
          tag.contents=function(x1)
          {
           return Runtime.New(Edit,{
            $:2,
            $0:g(x1)
           });
          };
          return _this.U.Reactive.Select(f.Body,tag.contents);
         }))),
         Dispose1:function()
         {
          return form1.Dispose1.call(null,null);
         },
         Notify:function(o)
         {
          return form1.Notify.call(null,o);
         },
         State:_this.U.Reactive.Select(_this.U.Reactive.CollectLatest(_this.U.Reactive.Select(formStream,function(f)
         {
          return f.State;
         })),arg10)
        });
       });
      },
      Sequence:function(fs)
      {
       var fs1,fs2,f,fComp,fRest;
       fs1=List.ofSeq(fs);
       if(fs1.$==1)
        {
         fs2=fs1.$1;
         f=fs1.$0;
         fComp=this.Return(function(v)
         {
          return function(vs)
          {
           return Runtime.New(T,{
            $:1,
            $0:v,
            $1:vs
           });
          };
         });
         fRest=this.Sequence(fs2);
         return this.Apply(this.Apply(fComp,f),fRest);
        }
       else
        {
         return this.Return(Runtime.New(T,{
          $:0
         }));
        }
      },
      Switch:function(formlet)
      {
       var _this=this;
       return this.New(function()
       {
        var x,formlet1,form1,objectArg,x1,objectArg1,formStream;
        x=_this.WithLayoutOrDefault(formlet);
        formlet1=_this.ApplyLayout(x);
        form1=_this.BuildForm(formlet1);
        objectArg=_this.U.Reactive;
        x1=objectArg.Choose(form1.State,function(res)
        {
         return res.$==1?{
          $:0
         }:{
          $:1,
          $0:_this.BuildForm(res.$0)
         };
        });
        objectArg1=_this.U.Reactive;
        formStream=objectArg1.Heat(x1);
        return Runtime.New(Form,{
         Body:_this.U.Reactive.Concat(form1.Body,_this.U.Reactive.Switch(_this.U.Reactive.Select(formStream,function(f)
         {
          return f.Body;
         }))),
         Dispose1:function()
         {
          return form1.Dispose1.call(null,null);
         },
         Notify:function(o)
         {
          return form1.Notify.call(null,o);
         },
         State:_this.U.Reactive.Switch(_this.U.Reactive.Select(formStream,function(f)
         {
          return f.State;
         }))
        });
       });
      },
      WithCancelation:function(formlet,cancelFormlet)
      {
       var f1,f2,f3;
       f1=this.Return(function(r1)
       {
        return function(r2)
        {
         var matchValue;
         matchValue=[r1,r2];
         return matchValue[1].$==0?Runtime.New(Result,{
          $:0,
          $0:{
           $:0
          }
         }):matchValue[0].$==1?Runtime.New(Result,{
          $:1,
          $0:matchValue[0].$0
         }):Runtime.New(Result,{
          $:0,
          $0:{
           $:1,
           $0:matchValue[0].$0
          }
         });
        };
       });
       f2=this.LiftResult(formlet);
       f3=this.LiftResult(cancelFormlet);
       return this.MapResult(function(arg00)
       {
        return Result.Join(arg00);
       },this.Apply(this.Apply(f1,f2),f3));
      },
      WithLayout:function(layout,formlet)
      {
       return Runtime.New(Formlet1,{
        Layout:layout,
        Build1:function()
        {
         return formlet.Build();
        },
        Utils:this.U
       });
      },
      WithLayoutOrDefault:function(formlet)
      {
       return this.MapBody(function(x)
       {
        return x;
       },formlet);
      },
      WithNotification:function(notify,formlet)
      {
       var arg10,_this=this;
       arg10=this.New(function()
       {
        var form;
        form=_this.BuildForm(formlet);
        return Runtime.New(Form,{
         Body:form.Body,
         Dispose1:form.Dispose1,
         Notify:function(obj)
         {
          form.Notify.call(null,obj);
          return notify(obj);
         },
         State:form.State
        });
       });
       return _this.WithLayout(formlet.get_Layout(),arg10);
      },
      WithNotificationChannel:function(formlet)
      {
       var arg10,_this=this;
       arg10=this.New(function()
       {
        var form,arg00;
        form=formlet.Build();
        arg00=function(v)
        {
         return[v,form.Notify];
        };
        return Runtime.New(Form,{
         Body:form.Body,
         Dispose1:form.Dispose1,
         Notify:form.Notify,
         State:_this.U.Reactive.Select(form.State,function(arg101)
         {
          return Result.Map(arg00,arg101);
         })
        });
       });
       return _this.WithLayout(formlet.get_Layout(),arg10);
      }
     },{
      New:function(U)
      {
       var r;
       r=Runtime.New(this,{});
       r.U=U;
       r.L=LayoutUtils.New({
        Reactive:r.U.Reactive
       });
       return r;
      }
     }),
     LayoutUtils:Runtime.Class({
      Default:function()
      {
       return{
        Apply:function()
        {
         return{
          $:0
         };
        }
       };
      },
      Delay:function(f)
      {
       return{
        Apply:function(x)
        {
         return f(null).Apply.call(null,x);
        }
       };
      },
      New:function(container)
      {
       return{
        Apply:function(event)
        {
         var panel,tree;
         panel=container(null);
         tree={
          contents:Runtime.New(Tree1,{
           $:0
          })
         };
         return{
          $:1,
          $0:[panel.Body,Util.subscribeTo(event,function(edit)
          {
           var deletedTree,off;
           deletedTree=Tree.ReplacedTree(edit,tree.contents);
           tree.contents=Tree.Apply(edit,tree.contents);
           off=(Tree.Range(edit,tree.contents))[0];
           panel.Remove.call(null,deletedTree.get_Sequence());
           return Seq.iteri(function(i)
           {
            return function(e)
            {
             return(panel.Insert.call(null,off+i))(e);
            };
           },edit);
          })]
         };
        }
       };
      }
     },{
      New:function()
      {
       return Runtime.New(this,{});
      }
     }),
     Result:Runtime.Class({},{
      Apply:function(f,r)
      {
       var matchValue;
       matchValue=[f,r];
       return matchValue[0].$==1?matchValue[1].$==1?Runtime.New(Result,{
        $:1,
        $0:List.append(matchValue[0].$0,matchValue[1].$0)
       }):Runtime.New(Result,{
        $:1,
        $0:matchValue[0].$0
       }):matchValue[1].$==1?Runtime.New(Result,{
        $:1,
        $0:matchValue[1].$0
       }):Runtime.New(Result,{
        $:0,
        $0:matchValue[0].$0.call(null,matchValue[1].$0)
       });
      },
      Join:function(res)
      {
       return res.$==1?Runtime.New(Result,{
        $:1,
        $0:res.$0
       }):res.$0;
      },
      Map:function(f,res)
      {
       return res.$==1?Runtime.New(Result,{
        $:1,
        $0:res.$0
       }):Runtime.New(Result,{
        $:0,
        $0:f(res.$0)
       });
      },
      OfOption:function(o)
      {
       return o.$==0?Runtime.New(Result,{
        $:1,
        $0:Runtime.New(T,{
         $:0
        })
       }):Runtime.New(Result,{
        $:0,
        $0:o.$0
       });
      },
      Sequence:function(rs)
      {
       return Seq.fold(function(rs1)
       {
        return function(r)
        {
         var fs1,vs;
         if(rs1.$==1)
          {
           fs1=rs1.$0;
           return r.$==1?Runtime.New(Result,{
            $:1,
            $0:List.append(fs1,r.$0)
           }):Runtime.New(Result,{
            $:1,
            $0:fs1
           });
          }
         else
          {
           vs=rs1.$0;
           return r.$==1?Runtime.New(Result,{
            $:1,
            $0:r.$0
           }):Runtime.New(Result,{
            $:0,
            $0:List.append(vs,List.ofArray([r.$0]))
           });
          }
        };
       },Runtime.New(Result,{
        $:0,
        $0:Runtime.New(T,{
         $:0
        })
       }),rs);
      }
     }),
     Tree:{
      Apply:function(edit,input)
      {
       var apply;
       apply=function(edit1,input1)
       {
        var edit2,r,edit3;
        if(edit1.$==1)
         {
          edit2=edit1.$0;
          if(input1.$==2)
           {
            r=input1.$1;
            return Runtime.New(Tree1,{
             $:2,
             $0:apply(edit2,input1.$0),
             $1:r
            });
           }
          else
           {
            return apply(Runtime.New(Edit,{
             $:1,
             $0:edit2
            }),Runtime.New(Tree1,{
             $:2,
             $0:Runtime.New(Tree1,{
              $:0
             }),
             $1:input1
            }));
           }
         }
        else
         {
          if(edit1.$==2)
           {
            edit3=edit1.$0;
            return input1.$==2?Runtime.New(Tree1,{
             $:2,
             $0:input1.$0,
             $1:apply(edit3,input1.$1)
            }):apply(Runtime.New(Edit,{
             $:2,
             $0:edit3
            }),Runtime.New(Tree1,{
             $:2,
             $0:input1,
             $1:Runtime.New(Tree1,{
              $:0
             })
            }));
           }
          else
           {
            return edit1.$0;
           }
         }
       };
       return apply(edit,input);
      },
      Count:function(t)
      {
       var loop,_,a,_1,_2,tree,k,ts,_3;
       loop=[];
       _=Runtime.New(T,{
        $:0
       });
       loop[3]=t;
       loop[2]=_;
       loop[1]=0;
       loop[0]=1;
       while(loop[0])
        {
         if(loop[3].$==2)
          {
           a=loop[3].$0;
           _1=Runtime.New(T,{
            $:1,
            $0:loop[3].$1,
            $1:loop[2]
           });
           _2=loop[1];
           loop[3]=a;
           loop[2]=_1;
           loop[1]=_2;
           loop[0]=1;
          }
         else
          {
           tree=loop[3];
           k=tree.$==0?0:1;
           if(loop[2].$==1)
            {
             ts=loop[2].$1;
             _3=loop[1]+k;
             loop[3]=loop[2].$0;
             loop[2]=ts;
             loop[1]=_3;
             loop[0]=1;
            }
           else
            {
             loop[0]=0;
             loop[1]=loop[1]+k;
            }
          }
        }
       return loop[1];
      },
      DeepFlipEdit:function(edit)
      {
       return edit.$==1?Runtime.New(Edit,{
        $:2,
        $0:Tree.DeepFlipEdit(edit.$0)
       }):edit.$==2?Runtime.New(Edit,{
        $:1,
        $0:Tree.DeepFlipEdit(edit.$0)
       }):Runtime.New(Edit,{
        $:0,
        $0:edit.$0
       });
      },
      Delete:function()
      {
       return Runtime.New(Edit,{
        $:0,
        $0:Runtime.New(Tree1,{
         $:0
        })
       });
      },
      Edit:Runtime.Class({
       GetEnumerator:function()
       {
        return Enumerator.Get(this.get_Sequence());
       },
       GetEnumerator1:function()
       {
        return Enumerator.Get(this.get_Sequence());
       },
       get_Sequence:function()
       {
        return this.$==1?this.$0.get_Sequence():this.$==2?this.$0.get_Sequence():this.$0.get_Sequence();
       }
      }),
      FlipEdit:function(edit)
      {
       return edit.$==1?Runtime.New(Edit,{
        $:2,
        $0:edit.$0
       }):edit.$==2?Runtime.New(Edit,{
        $:1,
        $0:edit.$0
       }):Runtime.New(Edit,{
        $:0,
        $0:edit.$0
       });
      },
      FromSequence:function(vs)
      {
       return Seq.fold(function(state)
       {
        return function(v)
        {
         return Runtime.New(Tree1,{
          $:2,
          $0:state,
          $1:Runtime.New(Tree1,{
           $:1,
           $0:v
          })
         });
        };
       },Runtime.New(Tree1,{
        $:0
       }),vs);
      },
      Range:function(edit,input)
      {
       var loop,edit1,l,_,_1,edit2,r,_2,_3;
       loop=[];
       loop[3]=0;
       loop[2]=input;
       loop[1]=edit;
       loop[0]=1;
       while(loop[0])
        {
         if(loop[1].$==1)
          {
           edit1=loop[1].$0;
           if(loop[2].$==2)
            {
             l=loop[2].$0;
             loop[3]=loop[3];
             loop[2]=l;
             loop[1]=edit1;
             loop[0]=1;
            }
           else
            {
             _=loop[3];
             _1=Runtime.New(Tree1,{
              $:0
             });
             loop[3]=_;
             loop[2]=_1;
             loop[1]=edit1;
             loop[0]=1;
            }
          }
         else
          {
           if(loop[1].$==2)
            {
             edit2=loop[1].$0;
             if(loop[2].$==2)
              {
               r=loop[2].$1;
               loop[3]=loop[3]+Tree.Count(loop[2].$0);
               loop[2]=r;
               loop[1]=edit2;
               loop[0]=1;
              }
             else
              {
               _2=loop[3]+Tree.Count(loop[2]);
               _3=Runtime.New(Tree1,{
                $:0
               });
               loop[3]=_2;
               loop[2]=_3;
               loop[1]=edit2;
               loop[0]=1;
              }
            }
           else
            {
             loop[0]=0;
             loop[1]=[loop[3],Tree.Count(loop[2])];
            }
          }
        }
       return loop[1];
      },
      ReplacedTree:function(edit,input)
      {
       var edit1,edit2;
       if(edit.$==1)
        {
         edit1=edit.$0;
         return input.$==2?Tree.ReplacedTree(edit1,input.$0):Tree.ReplacedTree(Runtime.New(Edit,{
          $:1,
          $0:edit1
         }),Runtime.New(Tree1,{
          $:2,
          $0:Runtime.New(Tree1,{
           $:0
          }),
          $1:input
         }));
        }
       else
        {
         if(edit.$==2)
          {
           edit2=edit.$0;
           return input.$==2?Tree.ReplacedTree(edit2,input.$1):Tree.ReplacedTree(Runtime.New(Edit,{
            $:2,
            $0:edit2
           }),Runtime.New(Tree1,{
            $:2,
            $0:input,
            $1:Runtime.New(Tree1,{
             $:0
            })
           }));
          }
         else
          {
           return input;
          }
        }
      },
      Set:function(value)
      {
       return Runtime.New(Edit,{
        $:0,
        $0:Runtime.New(Tree1,{
         $:1,
         $0:value
        })
       });
      },
      ShowEdit:function(edit)
      {
       var showE;
       showE=function(edit1)
       {
        return edit1.$==1?"Left > "+showE(edit1.$0):edit1.$==2?"Right > "+showE(edit1.$0):"Replace";
       };
       return showE(edit);
      },
      Transform:function(f,edit)
      {
       return edit.$==1?Runtime.New(Edit,{
        $:1,
        $0:Tree.Transform(f,edit.$0)
       }):edit.$==2?Runtime.New(Edit,{
        $:2,
        $0:Tree.Transform(f,edit.$0)
       }):Runtime.New(Edit,{
        $:0,
        $0:f(edit.$0)
       });
      },
      Tree:Runtime.Class({
       GetEnumerator:function()
       {
        return Enumerator.Get(this.get_Sequence());
       },
       GetEnumerator1:function()
       {
        return Enumerator.Get(this.get_Sequence());
       },
       Map:function(f)
       {
        var right;
        if(this.$==1)
         {
          return Runtime.New(Tree1,{
           $:1,
           $0:f(this.$0)
          });
         }
        else
         {
          if(this.$==2)
           {
            right=this.$1;
            return Runtime.New(Tree1,{
             $:2,
             $0:this.$0.Map(f),
             $1:right.Map(f)
            });
           }
          else
           {
            return Runtime.New(Tree1,{
             $:0
            });
           }
         }
       },
       get_Sequence:function()
       {
        var y;
        if(this.$==1)
         {
          return[this.$0];
         }
        else
         {
          if(this.$==2)
           {
            y=this.$1;
            return Seq.append(this.$0.get_Sequence(),y.get_Sequence());
           }
          else
           {
            return Seq.empty();
           }
         }
       }
      })
     },
     Validator:Runtime.Class({
      Is:function(f,m,flet)
      {
       return this.Validate(f,m,flet);
      },
      IsEmail:function(msg)
      {
       var _this=this;
       return function(arg20)
       {
        return _this.IsRegexMatch("^[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\\.)+[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?$",msg,arg20);
       };
      },
      IsEqual:function(value,msg,flet)
      {
       return this.Validate(function(i)
       {
        return Unchecked.Equals(i,value);
       },msg,flet);
      },
      IsFloat:function(msg)
      {
       var _this=this;
       return function(arg20)
       {
        return _this.IsRegexMatch("^\\s*(\\+|-)?((\\d+(\\.\\d+)?)|(\\.\\d+))\\s*$",msg,arg20);
       };
      },
      IsGreaterThan:function(min,msg,flet)
      {
       return this.Validate(function(i)
       {
        return Unchecked.Compare(i,min)===1;
       },msg,flet);
      },
      IsInt:function(msg)
      {
       var _this=this;
       return function(arg20)
       {
        return _this.IsRegexMatch("^-?\\d+$",msg,arg20);
       };
      },
      IsLessThan:function(max,msg,flet)
      {
       return this.Validate(function(i)
       {
        return Unchecked.Compare(i,max)===-1;
       },msg,flet);
      },
      IsNotEmpty:function(msg,flet)
      {
       return this.Validate(function(s)
       {
        return s!=="";
       },msg,flet);
      },
      IsNotEqual:function(value,msg,flet)
      {
       return this.Validate(function(i)
       {
        return!Unchecked.Equals(i,value);
       },msg,flet);
      },
      IsRegexMatch:function(regex,msg,flet)
      {
       var _this=this;
       return this.Validate(function(x)
       {
        return _this.VP.Matches(regex,x);
       },msg,flet);
      },
      IsTrue:function(msg,flet)
      {
       return this.Validate(function(x)
       {
        return x;
       },msg,flet);
      },
      Validate:function(f,msg,flet)
      {
       return flet.MapResult(function(res)
       {
        var v;
        if(res.$==1)
         {
          return Runtime.New(Result,{
           $:1,
           $0:res.$0
          });
         }
        else
         {
          v=res.$0;
          return f(v)?Runtime.New(Result,{
           $:0,
           $0:v
          }):Runtime.New(Result,{
           $:1,
           $0:List.ofArray([msg])
          });
         }
       });
      }
     },{
      New:function(VP)
      {
       var r;
       r=Runtime.New(this,{});
       r.VP=VP;
       return r;
      }
     })
    }
   }
  }
 });
 Runtime.OnInit(function()
 {
  Formlet=Runtime.Safe(Global.IntelliFactory.Formlet);
  Base=Runtime.Safe(Formlet.Base);
  Formlet1=Runtime.Safe(Base.Formlet);
  Form=Runtime.Safe(Base.Form);
  Tree=Runtime.Safe(Base.Tree);
  Edit=Runtime.Safe(Tree.Edit);
  Result=Runtime.Safe(Base.Result);
  WebSharper=Runtime.Safe(Global.IntelliFactory.WebSharper);
  List=Runtime.Safe(WebSharper.List);
  T=Runtime.Safe(List.T);
  LayoutUtils=Runtime.Safe(Base.LayoutUtils);
  Tree1=Runtime.Safe(Tree.Tree);
  Util=Runtime.Safe(WebSharper.Util);
  Seq=Runtime.Safe(WebSharper.Seq);
  Enumerator=Runtime.Safe(WebSharper.Enumerator);
  return Unchecked=Runtime.Safe(WebSharper.Unchecked);
 });
 Runtime.OnLoad(function()
 {
  return;
 });
}());

(function()
{
 var Global=this,Runtime=this.IntelliFactory.Runtime,WebSharper,Formlet,Body,Controls,Html,Default,List,Data,Reactive,HotStream,Formlet1,Base,Result,T,Operators,jQuery,EventsPervasives,Formlet2,Operators1,CssConstants,Math,Seq,Utils,Tree,Edit,Form,Arrays,FormletProvider,Formlet3,Util,LayoutProvider,LayoutUtils,Reactive1,Validator,ValidatorProvidor,RegExp,Collections,Dictionary,ElementStore,Enhance,FormButtonConfiguration,FormContainerConfiguration,Padding,ManyConfiguration,ValidationFrameConfiguration,ValidationIconConfiguration,JSON,FormletBuilder,Layout,FormRowConfiguration,LabelConfiguration,Padding1,Enumerator;
 Runtime.Define(Global,{
  IntelliFactory:{
   WebSharper:{
    Formlet:{
     Body:Runtime.Class({},{
      New:function(el,l)
      {
       return Runtime.New(Body,{
        Element:el,
        Label:l
       });
      }
     }),
     Controls:{
      Button:function(label)
      {
       return Controls.ElementButton(function()
       {
        return Default.Button(List.ofArray([Default.Text(label)]));
       });
      },
      Checkbox:function(def)
      {
       return Controls.CheckboxControl(false,def);
      },
      CheckboxControl:function(readOnly,def)
      {
       return Data.MkFormlet(function()
       {
        var state,readOnlyAtts,x,arg00,body,reset;
        state=HotStream.New(Runtime.New(Result,{
         $:0,
         $0:def
        }));
        readOnlyAtts=readOnly?List.ofArray([Default.Attr().NewAttr("disabled","disabled")]):Runtime.New(T,{
         $:0
        });
        x=Operators.add(Default.Input(List.ofArray([Default.Attr().NewAttr("type","checkbox"),Default.Attr().Class("inputCheckbox")])),readOnlyAtts);
        arg00=function(cb)
        {
         return function()
         {
          return!readOnly?state.Trigger(Runtime.New(Result,{
           $:0,
           $0:jQuery(cb.Body).prop("checked")
          })):null;
         };
        };
        EventsPervasives.Events().OnClick(arg00,x);
        body=x;
        if(def)
         {
          body["HtmlProvider@32"].SetAttribute(body.Body,"defaultChecked","true");
         }
        else
         {
          body["HtmlProvider@32"].RemoveAttribute(body.Body,"checked");
         }
        reset=function()
        {
         if(def)
          {
           body["HtmlProvider@32"].SetProperty(body.Body,"checked",true);
          }
         else
          {
           body["HtmlProvider@32"].RemoveAttribute(body.Body,"checked");
           body["HtmlProvider@32"].SetProperty(body.Body,"checked",false);
          }
         return state.Trigger(Runtime.New(Result,{
          $:0,
          $0:def
         }));
        };
        reset(null);
        return[body,reset,state];
       });
      },
      CheckboxGroup:function(values)
      {
       return Controls.CheckboxGroupControl(false,values);
      },
      CheckboxGroupControl:function(readOnly,values)
      {
       var x,chooser;
       x=Formlet2.Sequence(List.map(Runtime.Tupled(function(tupledArg)
       {
        var l,v,formlet;
        l=tupledArg[0];
        v=tupledArg[1];
        formlet=Controls.CheckboxControl(readOnly,tupledArg[2]);
        return Formlet2.Map(function(b)
        {
         return[b,v];
        },Formlet2.WithLabel({
         $:1,
         $0:function()
         {
          var arg10;
          arg10=List.ofArray([Default.Text(l)]);
          return Default.Tags().NewTag("label",arg10);
         }
        },formlet));
       }),values));
       chooser=Runtime.Tupled(function(tupledArg)
       {
        var v;
        v=tupledArg[1];
        return tupledArg[0]?{
         $:1,
         $0:v
        }:{
         $:0
        };
       });
       return Formlet2.Map(function(list)
       {
        return List.choose(chooser,list);
       },x);
      },
      ElementButton:function(genElem)
      {
       return Data.MkFormlet(function()
       {
        var state,count,x,arg00;
        state=HotStream.New(Runtime.New(Result,{
         $:1,
         $0:Runtime.New(T,{
          $:0
         })
        }));
        count={
         contents:0
        };
        x=genElem(null);
        arg00=function()
        {
         return function()
         {
          state.Trigger(Runtime.New(Result,{
           $:0,
           $0:count.contents
          }));
          return Operators1.Increment(count);
         };
        };
        EventsPervasives.Events().OnClick(arg00,x);
        return[x,function()
        {
         count.contents=0;
         return state.Trigger(Runtime.New(Result,{
          $:1,
          $0:Runtime.New(T,{
           $:0
          })
         }));
        },state];
       });
      },
      Input:function(value)
      {
       return Controls.InputField(false,"text",CssConstants.InputTextClass(),value);
      },
      InputControl:function(value,f)
      {
       return Data.MkFormlet(function()
       {
        var state,body;
        state=HotStream.New(Runtime.New(Result,{
         $:0,
         $0:value
        }));
        body=f(state);
        body.set_Value(value);
        return[body,function()
        {
         body.set_Value(value);
         return state.Trigger(Runtime.New(Result,{
          $:0,
          $0:value
         }));
        },state];
       });
      },
      InputField:function(readOnly,typ,cls,value)
      {
       return Controls.InputControl(value,function(state)
       {
        var ro,input;
        ro=readOnly?List.ofArray([Default.Attr().NewAttr("readonly","readonly")]):Runtime.New(T,{
         $:0
        });
        input=Default.Input(List.append(List.ofArray([Default.Attr().NewAttr("type",typ),Default.Attr().Class(cls)]),ro));
        Controls.OnTextChange(function()
        {
         return!readOnly?state.Trigger(Runtime.New(Result,{
          $:0,
          $0:input.get_Value()
         })):null;
        },input);
        return input;
       });
      },
      OnTextChange:function(f,control)
      {
       var value,up,arg00,arg001;
       value={
        contents:control.get_Value()
       };
       up=function()
       {
        if(control.get_Value()!==value.contents)
         {
          value.contents=control.get_Value();
          return f(null);
         }
        else
         {
          return null;
         }
       };
       arg00=function()
       {
        return up(null);
       };
       EventsPervasives.Events().OnChange(arg00,control);
       arg001=function()
       {
        return function()
        {
         return up(null);
        };
       };
       EventsPervasives.Events().OnKeyUp(arg001,control);
       control.Body.oninput=up;
       return;
      },
      Password:function(value)
      {
       return Controls.InputField(false,"password","inputPassword",value);
      },
      RadioButtonGroup:function(def,values)
      {
       return Controls.RadioButtonGroupControl(false,def,values);
      },
      RadioButtonGroupControl:function(readOnly,def,values)
      {
       return Formlet2.New(function()
       {
        var groupId,x,x1,d,state,mapping,rbLbVls,resetRB,x2;
        groupId="id"+Math.round(Math.random()*100000000);
        if(def.$==0)
         {
          x={
           $:0
          };
         }
        else
         {
          x1=List.mapi(function(ix)
          {
           return Runtime.Tupled(function(tupledArg)
           {
            return[ix,tupledArg[1]];
           });
          },values);
          x=Seq.tryPick(Runtime.Tupled(function(tupledArg)
          {
           var ix,value;
           ix=tupledArg[0];
           value=tupledArg[1];
           return def.$==0?{
            $:0
           }:def.$0===ix?{
            $:1,
            $0:Runtime.New(Result,{
             $:0,
             $0:value
            })
           }:{
            $:0
           };
          }),x1);
         }
        d=HotStream.New(Runtime.New(Result,{
         $:1,
         $0:Runtime.New(T,{
          $:0
         })
        }));
        state=Utils.Maybe(d,function(arg00)
        {
         return HotStream.New(arg00);
        },x);
        mapping=Runtime.Tupled(function(tupledArg)
        {
         var label,value;
         label=tupledArg[0];
         value=tupledArg[1];
         return[Operators.add(Default.Input(List.ofArray([Default.Attr().Class("inputRadio"),Default.Attr().NewAttr("type","radio"),Default.Attr().NewAttr("name",groupId)])),readOnly?List.ofArray([Default.Attr().NewAttr("disabled","disabled")]):Runtime.New(T,{
          $:0
         })),label,value];
        });
        rbLbVls=List.map(mapping,values);
        resetRB=function(rb,value,ix)
        {
         if(def.$==0)
          {
           rb["HtmlProvider@32"].RemoveAttribute(rb.Body,"checked");
           return state.Trigger(Runtime.New(Result,{
            $:1,
            $0:Runtime.New(T,{
             $:0
            })
           }));
          }
         else
          {
           if(def.$0===ix)
            {
             rb["HtmlProvider@32"].SetProperty(rb.Body,"checked",true);
             return state.Trigger(Runtime.New(Result,{
              $:0,
              $0:value
             }));
            }
           else
            {
             return rb["HtmlProvider@32"].SetProperty(rb.Body,"checked",false);
            }
          }
        };
        x2=Runtime.New(Edit,{
         $:0,
         $0:Tree.FromSequence(List.mapi(function(ix)
         {
          return Runtime.Tupled(function(tupledArg)
          {
           var rb,label,value,arg00;
           rb=tupledArg[0];
           label=tupledArg[1];
           value=tupledArg[2];
           resetRB(rb,value,ix);
           arg00=function()
           {
            return function()
            {
             return!readOnly?state.Trigger(Runtime.New(Result,{
              $:0,
              $0:value
             })):null;
            };
           };
           EventsPervasives.Events().OnClick(arg00,rb);
           return Runtime.New(Body,{
            Element:rb,
            Label:{
             $:1,
             $0:function()
             {
              var arg10;
              arg10=List.ofArray([Default.Text(label)]);
              return Default.Tags().NewTag("label",arg10);
             }
            }
           });
          });
         },rbLbVls))
        });
        return Runtime.New(Form,{
         Body:Data.RX().Return(x2),
         Dispose1:function()
         {
         },
         Notify:function()
         {
          return Seq.iteri(function(ix)
          {
           return Runtime.Tupled(function(tupledArg)
           {
            return resetRB(tupledArg[0],tupledArg[2],ix);
           });
          },rbLbVls);
         },
         State:state
        });
       });
      },
      ReadOnlyCheckbox:function(def)
      {
       return Controls.CheckboxControl(true,def);
      },
      ReadOnlyInput:function(value)
      {
       return Controls.InputField(true,"text",CssConstants.InputTextClass(),value);
      },
      ReadOnlyRadioButtonGroup:function(def,values)
      {
       return Controls.RadioButtonGroupControl(true,def,values);
      },
      ReadOnlySelect:function(def,vls)
      {
       return Controls.SelectControl(true,def,vls);
      },
      ReadOnlyTextArea:function(value)
      {
       return Controls.TextAreaControl(true,value);
      },
      Select:function(def,vls)
      {
       return Controls.SelectControl(false,def,vls);
      },
      SelectControl:function(readOnly,def,vls)
      {
       return Data.MkFormlet(function()
       {
        var mapping,x,aVls,sIx,x1,select,body,sValue,state,reset,arg00;
        mapping=Runtime.Tupled(function(tuple)
        {
         return tuple[1];
        });
        x=List.map(mapping,vls);
        aVls=Arrays.ofSeq(x);
        sIx=(def>=0?def<vls.get_Length():false)?def:0;
        x1=List.mapi(function(i)
        {
         return Runtime.Tupled(function(tupledArg)
         {
          var nm;
          nm=tupledArg[0];
          return Default.Tags().NewTag("option",List.ofArray([Default.Text(nm),Default.Attr().NewAttr("value",Global.String(i))]));
         });
        },vls);
        select=Default.Select(x1);
        body=readOnly?Operators.add(select,List.ofArray([Default.Attr().NewAttr("disabled","disabled")])):select;
        sValue=Runtime.New(Result,{
         $:0,
         $0:aVls[sIx]
        });
        state=HotStream.New(sValue);
        reset=function()
        {
         body["HtmlProvider@32"].SetProperty(body.Body,"value",Global.String(sIx));
         return state.Trigger(sValue);
        };
        reset(null);
        arg00=function()
        {
         return!readOnly?state.Trigger(Runtime.New(Result,{
          $:0,
          $0:aVls[body.get_Value()<<0]
         })):null;
        };
        EventsPervasives.Events().OnChange(arg00,body);
        reset(null);
        return[body,reset,state];
       });
      },
      TextArea:function(value)
      {
       return Controls.TextAreaControl(false,value);
      },
      TextAreaControl:function(readOnly,value)
      {
       return Controls.InputControl(value,function(state)
       {
        var input;
        input=Default.TextArea(readOnly?List.ofArray([Default.Attr().NewAttr("readonly","readonly")]):Runtime.New(T,{
         $:0
        }));
        Controls.OnTextChange(function()
        {
         return!readOnly?state.Trigger(Runtime.New(Result,{
          $:0,
          $0:input.get_Value()
         })):null;
        },input);
        return input;
       });
      }
     },
     CssConstants:{
      InputTextClass:Runtime.Field(function()
      {
       return"inputText";
      })
     },
     Data:{
      $:function(f,x)
      {
       return Data.OfIFormlet(Data.BaseFormlet().Apply(f,x));
      },
      BaseFormlet:function()
      {
       return FormletProvider.New(Data.UtilsProvider());
      },
      DefaultLayout:Runtime.Field(function()
      {
       return Data.Layout().get_Vertical();
      }),
      Formlet:Runtime.Class({
       Build:function()
       {
        return this.BuildInternal.call(null,null);
       },
       MapResult:function(f)
       {
        var _this=this;
        return Runtime.New(Formlet3,{
         BuildInternal:function()
         {
          var form;
          form=_this.BuildInternal.call(null,null);
          return Runtime.New(Form,{
           Body:form.Body,
           Dispose1:form.Dispose1,
           Notify:form.Notify,
           State:_this.Utils.Reactive.Select(form.State,function(x)
           {
            return f(x);
           })
          });
         },
         LayoutInternal:_this.LayoutInternal,
         ElementInternal:{
          $:0
         },
         FormletBase:_this.FormletBase,
         Utils:_this.Utils
        });
       },
       Render:function()
       {
        return this.Run(function()
        {
        }).Render();
       },
       Run:function(f)
       {
        var matchValue,formlet,form,matchValue1,el;
        matchValue=this.ElementInternal;
        if(matchValue.$==0)
         {
          formlet=this.FormletBase.ApplyLayout(this);
          form=formlet.Build();
          Util.subscribeTo(form.State,function(res)
          {
           Result.Map(f,res);
          });
          matchValue1=formlet.get_Layout().Apply.call(null,form.Body);
          el=matchValue1.$==0?Data.DefaultLayout().Apply.call(null,form.Body).$0[0].Element:matchValue1.$0[0].Element;
          this.ElementInternal={
           $:1,
           $0:el
          };
          return el;
         }
        else
         {
          return matchValue.$0;
         }
       },
       get_Body:function()
       {
        return this.Run(function()
        {
        }).get_Body();
       },
       get_Layout:function()
       {
        return this.LayoutInternal;
       }
      }),
      Layout:Runtime.Field(function()
      {
       return LayoutProvider.New(LayoutUtils.New({
        Reactive:Reactive1.Default()
       }));
      }),
      MkFormlet:function(f)
      {
       var arg00;
       arg00=function()
       {
        var patternInput,state,reset,Notify,arg001;
        patternInput=f(null);
        state=patternInput[2];
        reset=patternInput[1];
        Notify=function()
        {
         return reset(null);
        };
        arg001=Tree.Set(Data.NewBody(patternInput[0],{
         $:0
        }));
        return Runtime.New(Form,{
         Body:Data.RX().Return(arg001),
         Dispose1:function()
         {
          return null;
         },
         Notify:Notify,
         State:state
        });
       };
       return Data.OfIFormlet(Data.BaseFormlet().New(arg00));
      },
      NewBody:function(arg00,arg10)
      {
       return Body.New(arg00,arg10);
      },
      OfIFormlet:function(formlet)
      {
       return Data.PropagateRenderFrom(formlet,Runtime.New(Formlet3,{
        BuildInternal:function()
        {
         return formlet.Build();
        },
        LayoutInternal:formlet.get_Layout(),
        ElementInternal:{
         $:0
        },
        FormletBase:Data.BaseFormlet(),
        Utils:Data.UtilsProvider()
       }));
      },
      PropagateRenderFrom:function(f1,f2)
      {
       if(f1.hasOwnProperty("Render"))
        {
         f2.Render=f1.Render;
        }
       return f2;
      },
      RX:Runtime.Field(function()
      {
       return Reactive1.Default();
      }),
      UtilsProvider:function()
      {
       return{
        Reactive:Data.RX(),
        DefaultLayout:Data.DefaultLayout()
       };
      },
      Validator:Runtime.Field(function()
      {
       return Validator.New(ValidatorProvidor.New());
      }),
      ValidatorProvidor:Runtime.Class({
       Matches:function(regex,text)
       {
        return text.match(new RegExp(regex));
       }
      },{
       New:function()
       {
        return Runtime.New(this,{});
       }
      })
     },
     ElementStore:Runtime.Class({
      Init:function()
      {
       this.store=Dictionary.New2();
       return;
      },
      RegisterElement:function(key,f)
      {
       return!this.store.ContainsKey(key)?this.store.set_Item(key,f):null;
      },
      Remove:function(key)
      {
       if(this.store.ContainsKey(key))
        {
         (this.store.get_Item(key))(null);
         this.store.Remove(key);
         return;
        }
       else
        {
         return null;
        }
      }
     },{
      New:function()
      {
       return Runtime.New(this,{});
      },
      NewElementStore:function()
      {
       var store;
       store=ElementStore.New();
       store.Init();
       return store;
      }
     }),
     Enhance:{
      Cancel:function(formlet,isCancel)
      {
       return Formlet2.Replace(formlet,function(value)
       {
        return isCancel(value)?Formlet2.Empty():Formlet2.Return(value);
       });
      },
      CustomMany:function(config,formlet)
      {
       var x,addButton,f,formlet1,c,formlet2,x1,delF,resetS,resetF,reset,_builder_;
       x=Controls.ElementButton(function()
       {
        return Operators.add(Default.Div(List.ofArray([Default.Attr().Class(config.AddIconClass)])),List.ofArray([Default.Div(Runtime.New(T,{
         $:0
        }))]));
       });
       addButton=Formlet2.InitWith(1,x);
       f=function()
       {
       };
       formlet1=Controls.ElementButton(function()
       {
        return Operators.add(Default.Div(List.ofArray([Default.Attr().Class(config.RemoveIconClass)])),List.ofArray([Default.Div(Runtime.New(T,{
         $:0
        }))]));
       });
       c=Formlet2.Map(f,formlet1);
       formlet2=Formlet2.WithCancelation(formlet,c);
       x1=Formlet2.WithLayout(Data.Layout().get_Horizontal(),formlet2);
       delF=Enhance.Deletable(x1);
       resetS=HotStream.New(Runtime.New(Result,{
        $:0,
        $0:null
       }));
       resetF=Data.OfIFormlet(Data.BaseFormlet().FromState(resetS));
       reset=function()
       {
        return resetS.Trigger(Runtime.New(Result,{
         $:0,
         $0:null
        }));
       };
       _builder_=Formlet2.Do();
       return Formlet2.WithNotification(reset,_builder_.Delay(function()
       {
        return _builder_.Bind(resetF,function()
        {
         return _builder_.ReturnFrom(Formlet2.ApplyLayout(Formlet2.WithLayoutOrDefault(Formlet2.Map(function(source)
         {
          return List.ofSeq(source);
         },Enhance.Many_(addButton,function()
         {
          return delF;
         })))));
        });
       }));
      },
      Deletable:function(formlet)
      {
       return Enhance.Replace(formlet,function(value)
       {
        return value.$==1?Formlet2.Return({
         $:1,
         $0:value.$0
        }):Formlet2.ReturnEmpty({
         $:0
        });
       });
      },
      FormButtonConfiguration:Runtime.Class({},{
       get_Default:function()
       {
        return Runtime.New(FormButtonConfiguration,{
         Label:{
          $:0
         },
         Style:{
          $:0
         },
         Class:{
          $:0
         }
        });
       }
      }),
      FormContainerConfiguration:Runtime.Class({},{
       get_Default:function()
       {
        var Description;
        Description={
         $:0
        };
        return Runtime.New(FormContainerConfiguration,{
         Header:{
          $:0
         },
         Padding:Padding.get_Default(),
         Description:Description,
         BackgroundColor:{
          $:0
         },
         BorderColor:{
          $:0
         },
         CssClass:{
          $:0
         },
         Style:{
          $:0
         }
        });
       }
      }),
      InputButton:function(conf,enabled)
      {
       return Data.MkFormlet(function()
       {
        var state,count,label,x1,arg00,submit,submit1,matchValue,matchValue1,reset;
        state=HotStream.New(Runtime.New(Result,{
         $:1,
         $0:Runtime.New(T,{
          $:0
         })
        }));
        count={
         contents:0
        };
        label=Utils.Maybe("Submit",function(x)
        {
         return x;
        },conf.Label);
        x1=Operators.add(Default.Input(List.ofArray([Default.Attr().NewAttr("type","button")])),List.ofArray([Default.Attr().Class("submitButton"),Default.Attr().NewAttr("value",label)]));
        arg00=function()
        {
         return function()
         {
          Operators1.Increment(count);
          return state.Trigger(Runtime.New(Result,{
           $:0,
           $0:count.contents
          }));
         };
        };
        EventsPervasives.Events().OnClick(arg00,x1);
        submit=x1;
        if(!enabled)
         {
          submit["HtmlProvider@32"].AddClass(submit.Body,"disabledButton");
         }
        matchValue=conf.Style;
        if(matchValue.$==1)
         {
          submit["HtmlProvider@32"].SetStyle(submit.Body,matchValue.$0);
         }
        matchValue1=conf.Class;
        if(matchValue1.$==1)
         {
          submit["HtmlProvider@32"].AddClass(submit.Body,matchValue1.$0);
         }
        submit1=submit;
        reset=function()
        {
         count.contents=0;
         return state.Trigger(Runtime.New(Result,{
          $:1,
          $0:Runtime.New(T,{
           $:0
          })
         }));
        };
        state.Trigger(Runtime.New(Result,{
         $:1,
         $0:Runtime.New(T,{
          $:0
         })
        }));
        return[submit1,reset,state];
       });
      },
      Many:function(formlet)
      {
       return Enhance.CustomMany(ManyConfiguration.get_Default(),formlet);
      },
      ManyConfiguration:Runtime.Class({},{
       get_Default:function()
       {
        return Runtime.New(ManyConfiguration,{
         AddIconClass:"addIcon",
         RemoveIconClass:"removeIcon"
        });
       }
      }),
      Many_:function(add,f)
      {
       var chooser;
       chooser=function(x)
       {
        return x;
       };
       return Formlet2.Map(function(source)
       {
        return Seq.choose(chooser,source);
       },Formlet2.FlipBody(Formlet2.SelectMany(Formlet2.Map(function(v)
       {
        return f(v);
       },add))));
      },
      Padding:Runtime.Class({},{
       get_Default:function()
       {
        return Runtime.New(Padding,{
         Left:{
          $:0
         },
         Right:{
          $:0
         },
         Top:{
          $:0
         },
         Bottom:{
          $:0
         }
        });
       }
      }),
      Replace:function(formlet,f)
      {
       return Formlet2.Switch(Formlet2.MapResult(function(res)
       {
        return res.$==1?Runtime.New(Result,{
         $:0,
         $0:Formlet2.FailWith(res.$0)
        }):Runtime.New(Result,{
         $:0,
         $0:f(res.$0)
        });
       },formlet));
      },
      ValidationFrameConfiguration:Runtime.Class({},{
       get_Default:function()
       {
        return Runtime.New(ValidationFrameConfiguration,{
         ValidClass:{
          $:1,
          $0:"successFormlet"
         },
         ValidStyle:{
          $:0
         },
         ErrorClass:{
          $:1,
          $0:"errorFormlet"
         },
         ErrorStyle:{
          $:0
         }
        });
       }
      }),
      ValidationIconConfiguration:Runtime.Class({},{
       get_Default:function()
       {
        return Runtime.New(ValidationIconConfiguration,{
         ValidIconClass:"validIcon",
         ErrorIconClass:"errorIcon"
        });
       }
      }),
      WithCssClass:function(css,formlet)
      {
       return Formlet2.MapElement(function(el)
       {
        el["HtmlProvider@32"].AddClass(el.Body,css);
        return el;
       },formlet);
      },
      WithCustomFormContainer:function(fc,formlet)
      {
       var x;
       x=Formlet2.ApplyLayout(formlet);
       return Formlet2.MapElement(function(formEl)
       {
        var x1,d,description,x2,d1,tb,cell,list,matchValue,matchValue1;
        x1=fc.Description;
        d=Runtime.New(T,{
         $:0
        });
        description=Utils.Maybe(d,function(descr)
        {
         var text;
         if(descr.$==1)
          {
           return List.ofArray([descr.$0.call(null,null)]);
          }
         else
          {
           text=descr.$0;
           return List.ofArray([Default.P(List.ofArray([Default.Tags().text(text)]))]);
          }
        },x1);
        x2=fc.Header;
        d1=Utils.InTable(List.ofArray([List.ofArray([Operators.add(Default.Div(List.ofArray([Default.Attr().Class("headerPanel")])),description)]),List.ofArray([formEl])]));
        tb=Utils.Maybe(d1,function(formElem)
        {
         var hdr,text;
         if(formElem.$==1)
          {
           hdr=formElem.$0.call(null,null);
          }
         else
          {
           text=formElem.$0;
           hdr=Default.H1(List.ofArray([Default.Tags().text(text)]));
          }
         return Utils.InTable(List.ofArray([List.ofArray([Operators.add(Default.Div(List.ofArray([Default.Attr().Class("headerPanel")])),Runtime.New(T,{
          $:1,
          $0:hdr,
          $1:description
         }))]),List.ofArray([formEl])]));
        },x2);
        cell=Operators.add(Default.TD(List.ofArray([Default.Attr().Class("formlet")])),List.ofArray([tb]));
        Utils.Maybe(null,function(color)
        {
         return cell["HtmlProvider@32"].SetStyle(cell.Body,"border-color: "+color);
        },fc.BorderColor);
        list=List.ofArray([["background-color",Utils.MapOption(function(color)
        {
         return color;
        },fc.BackgroundColor)],["padding-left",Utils.MapOption(function(v)
        {
         return Global.String(v)+"px";
        },fc.Padding.Left)],["padding-right",Utils.MapOption(function(v)
        {
         return Global.String(v)+"px";
        },fc.Padding.Right)],["padding-top",Utils.MapOption(function(v)
        {
         return Global.String(v)+"px";
        },fc.Padding.Top)],["padding-bottom",Utils.MapOption(function(v)
        {
         return Global.String(v)+"px";
        },fc.Padding.Bottom)]]);
        Seq.iter(Runtime.Tupled(function(tupledArg)
        {
         var name,value;
         name=tupledArg[0];
         value=tupledArg[1];
         return value.$==0?null:cell["HtmlProvider@32"].SetCss(cell.Body,name,value.$0);
        }),list);
        matchValue=fc.Style;
        if(matchValue.$==0)
         {
         }
        else
         {
          cell["HtmlProvider@32"].SetStyle(cell.Body,matchValue.$0);
         }
        matchValue1=fc.CssClass;
        if(matchValue1.$==0)
         {
         }
        else
         {
          cell["HtmlProvider@32"].AddClass(cell.Body,matchValue1.$0);
         }
        return Default.Table(List.ofArray([Default.TBody(List.ofArray([Default.TR(List.ofArray([cell]))]))]));
       },x);
      },
      WithCustomResetButton:function(buttonConf,formlet)
      {
       return Enhance.WithResetFormlet(formlet,Enhance.InputButton(buttonConf.Label.$==0?Runtime.New(FormButtonConfiguration,{
        Label:{
         $:1,
         $0:"Reset"
        },
        Style:buttonConf.Style,
        Class:buttonConf.Class
       }):buttonConf,true));
      },
      WithCustomSubmitAndResetButtons:function(submitConf,resetConf,formlet)
      {
       return Enhance.WithSubmitAndReset(formlet,function(reset)
       {
        return function(result)
        {
         var submit,fs,value,_builder_,reset1,formlet1;
         if(result.$==1)
          {
           fs=result.$0;
           submit=Formlet2.MapResult(function()
           {
            return Runtime.New(Result,{
             $:1,
             $0:fs
            });
           },Enhance.InputButton(submitConf,false));
          }
         else
          {
           value=result.$0;
           submit=Formlet2.Map(function()
           {
            return value;
           },Enhance.InputButton(submitConf,true));
          }
         _builder_=Formlet2.Do();
         reset1=_builder_.Delay(function()
         {
          return _builder_.Bind(Formlet2.LiftResult(Enhance.InputButton(resetConf,true)),function(_arg1)
          {
           if(_arg1.$==0)
            {
             reset(null);
            }
           return _builder_.Return(null);
          });
         });
         formlet1=Data.$(Data.$(Formlet2.Return(function(v)
         {
          return function()
          {
           return v;
          };
         }),submit),reset1);
         return Formlet2.WithLayout(Data.Layout().get_Horizontal(),formlet1);
        };
       });
      },
      WithCustomSubmitButton:function(buttonConf,formlet)
      {
       var buttonConf1;
       buttonConf1=buttonConf.Label.$==0?Runtime.New(FormButtonConfiguration,{
        Label:{
         $:1,
         $0:"Submit"
        },
        Style:buttonConf.Style,
        Class:buttonConf.Class
       }):buttonConf;
       return Enhance.WithSubmitFormlet(formlet,function(res)
       {
        return Formlet2.Map(function()
        {
        },Enhance.InputButton(buttonConf1,res.$==0?true:false));
       });
      },
      WithCustomValidationFrame:function(vc,formlet)
      {
       return Enhance.WrapFormlet(function(state)
       {
        return function(body)
        {
         var x;
         x=Default.Div(List.ofArray([body.Element]));
         Operators.OnAfterRender(function(panel)
         {
          Util.subscribeTo(state,function(res)
          {
           var msgs,matchValue,matchValue1,matchValue2,matchValue3,matchValue4,matchValue5;
           if(res.$==1)
            {
             msgs=res.$0;
             matchValue=vc.ValidClass;
             if(matchValue.$==1)
              {
               panel["HtmlProvider@32"].RemoveClass(panel.Body,matchValue.$0);
              }
             matchValue1=vc.ErrorClass;
             if(matchValue1.$==1)
              {
               panel["HtmlProvider@32"].AddClass(panel.Body,matchValue1.$0);
              }
             matchValue2=vc.ErrorStyle;
             return matchValue2.$==1?panel["HtmlProvider@32"].SetStyle(panel.Body,matchValue2.$0):panel["HtmlProvider@32"].SetStyle(panel.Body,"");
            }
           else
            {
             matchValue3=vc.ErrorClass;
             if(matchValue3.$==1)
              {
               panel["HtmlProvider@32"].RemoveClass(panel.Body,matchValue3.$0);
              }
             matchValue4=vc.ValidClass;
             if(matchValue4.$==1)
              {
               panel["HtmlProvider@32"].AddClass(panel.Body,matchValue4.$0);
              }
             matchValue5=vc.ValidStyle;
             return matchValue5.$==1?panel["HtmlProvider@32"].SetStyle(panel.Body,matchValue5.$0):panel["HtmlProvider@32"].SetStyle(panel.Body,"");
            }
          });
         },x);
         return x;
        };
       },formlet);
      },
      WithCustomValidationIcon:function(vic,formlet)
      {
       var formlet1,_builder_,x;
       formlet1=Formlet2.WithLayoutOrDefault(formlet);
       _builder_=Formlet2.Do();
       x=Formlet2.MapResult(function(arg00)
       {
        return Result.Join(arg00);
       },_builder_.Delay(function()
       {
        return _builder_.Bind(Formlet2.LiftResult(formlet1),function(_arg1)
        {
         return _builder_.Bind(Formlet2.OfElement(function()
         {
          var title;
          if(_arg1.$==1)
           {
            title=Seq.fold(function(x1)
            {
             return function(y)
             {
              return x1+" "+y;
             };
            },"",_arg1.$0);
            return Operators.add(Default.Div(List.ofArray([Default.Attr().Class(vic.ErrorIconClass),Default.Attr().NewAttr("title",title)])),List.ofArray([Default.Div(Runtime.New(T,{
             $:0
            }))]));
           }
          else
           {
            return Operators.add(Default.Div(List.ofArray([Default.Attr().Class(vic.ValidIconClass),Default.Attr().NewAttr("title","")])),List.ofArray([Default.Div(Runtime.New(T,{
             $:0
            }))]));
           }
         }),function()
         {
          return _builder_.Return(_arg1);
         });
        });
       }));
       return Formlet2.WithLayout(Data.Layout().get_Horizontal(),x);
      },
      WithErrorFormlet:function(f,formlet)
      {
       var _builder_;
       _builder_=Formlet2.Do();
       return Formlet2.MapResult(function(arg00)
       {
        return Result.Join(arg00);
       },_builder_.Delay(function()
       {
        return _builder_.Bind(Formlet2.LiftResult(formlet),function(_arg1)
        {
         var _,msgs,_builder_1;
         if(_arg1.$==1)
          {
           msgs=_arg1.$0;
           _builder_1=Formlet2.Do();
           _=_builder_1.Delay(function()
           {
            return _builder_1.Bind(f(msgs),function()
            {
             return _builder_1.Return(_arg1);
            });
           });
          }
         else
          {
           _=Formlet2.Return(_arg1);
          }
         return _builder_.ReturnFrom(_);
        });
       }));
      },
      WithErrorSummary:function(label,formlet)
      {
       var _builder_;
       _builder_=Formlet2.Do();
       return Formlet2.MapResult(function(arg00)
       {
        return Result.Join(arg00);
       },_builder_.Delay(function()
       {
        return _builder_.Bind(Formlet2.LiftResult(formlet),function(_arg1)
        {
         var _,fs;
         if(_arg1.$==1)
          {
           fs=_arg1.$0;
           _=Formlet2.Map(function()
           {
            return _arg1;
           },Formlet2.OfElement(function()
           {
            var arg10,arg101;
            arg101=List.ofArray([Default.Text(label)]);
            arg10=List.ofArray([Default.Tags().NewTag("legend",arg101),Default.UL(List.map(function(f)
            {
             return Default.LI(List.ofArray([Default.Text(f)]));
            },fs))]);
            return Default.Tags().NewTag("fieldset",arg10);
           }));
          }
         else
          {
           _=Formlet2.Return(_arg1);
          }
         return _builder_.ReturnFrom(_);
        });
       }));
      },
      WithFormContainer:function(formlet)
      {
       return Enhance.WithCustomFormContainer(FormContainerConfiguration.get_Default(),formlet);
      },
      WithJsonPost:function(conf,formlet)
      {
       var matchValue,postUrl,arg10,matchValue1,enc,arg101,_this,arg102,arg103,hiddenField,_this1,arg104,submitButton,x,f;
       matchValue=conf.PostUrl;
       if(matchValue.$==0)
        {
         postUrl=Runtime.New(T,{
          $:0
         });
        }
       else
        {
         arg10=matchValue.$0;
         postUrl=List.ofArray([Default.Attr().NewAttr("action",arg10)]);
        }
       matchValue1=conf.EncodingType;
       if(matchValue1.$==0)
        {
         enc=Runtime.New(T,{
          $:0
         });
        }
       else
        {
         arg101=matchValue1.$0;
         enc=List.ofArray([Default.Attr().NewAttr("enctype",arg101)]);
        }
       _this=Default.Tags();
       arg103=conf.ParameterName;
       arg102=List.ofArray([Default.Attr().NewAttr("type","hidden"),Default.Attr().NewAttr("name",arg103)]);
       hiddenField=_this.NewTag("input",arg102);
       _this1=Default.Tags();
       arg104=List.ofArray([Default.Attr().NewAttr("type","submit"),Default.Attr().NewAttr("value","Submit")]);
       submitButton=_this1.NewTag("input",arg104);
       x=Operators.add(Default.Form(List.append(Runtime.New(T,{
        $:1,
        $0:Default.Attr().NewAttr("method","POST"),
        $1:Runtime.New(T,{
         $:1,
         $0:Default.Attr().NewAttr("style","display:none"),
         $1:postUrl
        })
       }),enc)),List.ofArray([hiddenField,submitButton]));
       f=function(value)
       {
        var data;
        data=JSON.stringify(value);
        jQuery(hiddenField.Body).val(data);
        return jQuery(submitButton.Body).click();
       };
       Operators.OnAfterRender(function(form)
       {
        var matchValue2;
        matchValue2=conf.EncodingType;
        return matchValue2.$==0?null:matchValue2.$0==="multipart/form-data"?void jQuery(form.Body).attr("encoding","multipart/form-data"):null;
       },x);
       return Default.Div(List.ofArray([x,Formlet2.Map(f,formlet)]));
      },
      WithLabel:function(labelGen,formlet)
      {
       return Formlet2.WithLabel({
        $:1,
        $0:labelGen
       },formlet);
      },
      WithLabelAbove:function(formlet)
      {
       return Formlet2.MapBody(function(body)
       {
        var matchValue;
        matchValue=body.Label;
        return Runtime.New(Body,{
         Element:Default.Table(List.ofArray([Default.TBody(List.ofArray([Default.TR(List.ofArray([Default.TD(List.ofArray([matchValue.$==0?Default.Span(Runtime.New(T,{
          $:0
         })):matchValue.$0.call(null,null)]))])),Default.TR(List.ofArray([Default.TD(List.ofArray([body.Element]))]))]))])),
         Label:{
          $:0
         }
        });
       },formlet);
      },
      WithLabelAndInfo:function(label,info,formlet)
      {
       return Enhance.WithLabel(function()
       {
        var arg10;
        arg10=List.ofArray([Default.Text(label)]);
        return Utils.InTable(List.ofArray([List.ofArray([Default.Tags().NewTag("label",arg10),Default.Span(List.ofArray([Default.Attr().NewAttr("title",info),Default.Attr().Class("infoIcon")]))])]));
       },formlet);
      },
      WithLabelConfiguration:function(lc,formlet)
      {
       var formlet1;
       formlet1=Formlet2.ApplyLayout(formlet);
       return Formlet2.WithLayout(Data.Layout().LabelLayout(lc),formlet1);
      },
      WithLabelLeft:function(formlet)
      {
       return Formlet2.MapBody(function(body)
       {
        var matchValue,label;
        matchValue=body.Label;
        label=matchValue.$==0?Default.Span(Runtime.New(T,{
         $:0
        })):matchValue.$0.call(null,null);
        return Runtime.New(Body,{
         Element:Default.Table(List.ofArray([Default.TBody(List.ofArray([Default.TR(List.ofArray([Default.TD(List.ofArray([body.Element])),Default.TD(List.ofArray([label]))]))]))])),
         Label:{
          $:0
         }
        });
       },formlet);
      },
      WithLegend:function(label,formlet)
      {
       return Formlet2.MapBody(function(body)
       {
        var arg10,arg101,matchValue;
        arg101=List.ofArray([Default.Tags().text(label)]);
        matchValue=body.Label;
        arg10=List.ofArray([Default.Tags().NewTag("legend",arg101),matchValue.$==0?body.Element:Utils.InTable(List.ofArray([List.ofArray([matchValue.$0.call(null,null),body.Element])]))]);
        return Runtime.New(Body,{
         Element:Default.Tags().NewTag("fieldset",arg10),
         Label:{
          $:0
         }
        });
       },formlet);
      },
      WithResetAction:function(f,formlet)
      {
       var formlet1;
       formlet1=Formlet2.New(function()
       {
        var form;
        form=formlet.Build();
        return Runtime.New(Form,{
         Body:form.Body,
         Dispose1:form.Dispose1,
         Notify:function(o)
         {
          return f(null)?form.Notify.call(null,o):null;
         },
         State:form.State
        });
       });
       return Data.OfIFormlet(Data.PropagateRenderFrom(formlet,Formlet2.WithLayout(formlet.get_Layout(),formlet1)));
      },
      WithResetButton:function(formlet)
      {
       return Enhance.WithCustomResetButton(FormButtonConfiguration.get_Default(),formlet);
      },
      WithResetFormlet:function(formlet,reset)
      {
       var formlet1,x,formlet2,button,_builder_;
       formlet1=Formlet2.InitWithFailure(Formlet2.ApplyLayout(Formlet2.WithLayoutOrDefault(formlet)));
       x=Formlet2.LiftResult(formlet1);
       formlet2=Formlet2.WithNotificationChannel(x);
       button=Formlet2.LiftResult(reset);
       _builder_=Formlet2.Do();
       return Data.OfIFormlet(Data.PropagateRenderFrom(formlet2,Formlet2.MapResult(function(arg00)
       {
        return Result.Join(arg00);
       },_builder_.Delay(function()
       {
        return _builder_.Bind(formlet2,Runtime.Tupled(function(_arg1)
        {
         var v,notify;
         v=_arg1[0];
         notify=_arg1[1];
         return _builder_.Bind(button,function(_arg2)
         {
          if(_arg2.$==0)
           {
            notify(null);
           }
          return _builder_.Return(v);
         });
        }));
       }))));
      },
      WithRowConfiguration:function(rc,formlet)
      {
       var formlet1;
       formlet1=Formlet2.ApplyLayout(formlet);
       return Formlet2.WithLayout(Data.Layout().RowLayout(rc),formlet1);
      },
      WithSubmitAndReset:function(formlet,submReset)
      {
       var _builder_;
       _builder_=Formlet2.Do();
       return Data.OfIFormlet(Data.PropagateRenderFrom(formlet,_builder_.Delay(function()
       {
        return _builder_.Bind(Formlet2.WithNotificationChannel(Formlet2.LiftResult(Formlet2.InitWithFailure(formlet))),Runtime.Tupled(function(_arg1)
        {
         var res,notify;
         res=_arg1[0];
         notify=_arg1[1];
         return _builder_.ReturnFrom((submReset(function(arg00)
         {
          return notify(arg00);
         }))(res));
        }));
       })));
      },
      WithSubmitAndResetButtons:function(formlet)
      {
       var inputRecord,submitConf,inputRecord1;
       inputRecord=FormButtonConfiguration.get_Default();
       submitConf=Runtime.New(FormButtonConfiguration,{
        Label:{
         $:1,
         $0:"Submit"
        },
        Style:inputRecord.Style,
        Class:inputRecord.Class
       });
       inputRecord1=FormButtonConfiguration.get_Default();
       return Enhance.WithCustomSubmitAndResetButtons(submitConf,Runtime.New(FormButtonConfiguration,{
        Label:{
         $:1,
         $0:"Reset"
        },
        Style:inputRecord1.Style,
        Class:inputRecord1.Class
       }),formlet);
      },
      WithSubmitButton:function(formlet)
      {
       return Enhance.WithCustomSubmitButton(FormButtonConfiguration.get_Default(),formlet);
      },
      WithSubmitFormlet:function(formlet,submit)
      {
       var _builder_;
       _builder_=Formlet2.Do();
       return Data.OfIFormlet(Data.PropagateRenderFrom(formlet,Formlet2.MapResult(function(arg00)
       {
        return Result.Join(arg00);
       },_builder_.Delay(function()
       {
        return _builder_.Bind(Formlet2.LiftResult(Formlet2.InitWithFailure(formlet)),function(_arg1)
        {
         return _builder_.Bind(submit(_arg1),function()
         {
          return _builder_.Return(_arg1);
         });
        });
       }))));
      },
      WithTextLabel:function(label,formlet)
      {
       return Enhance.WithLabel(function()
       {
        var arg10;
        arg10=List.ofArray([Default.Text(label)]);
        return Default.Tags().NewTag("label",arg10);
       },formlet);
      },
      WithValidationFrame:function(formlet)
      {
       return Enhance.WithCustomValidationFrame(ValidationFrameConfiguration.get_Default(),formlet);
      },
      WithValidationIcon:function(formlet)
      {
       return Enhance.WithCustomValidationIcon(ValidationIconConfiguration.get_Default(),formlet);
      },
      WrapFormlet:function(wrapper,formlet)
      {
       return Data.MkFormlet(function()
       {
        var formlet1,form,body;
        formlet1=Formlet2.WithLayoutOrDefault(formlet);
        form=Formlet2.BuildForm(formlet1);
        body=formlet1.get_Layout().Apply.call(null,form.Body).$0[0];
        return[(wrapper(form.State))(body),function()
        {
         return form.Notify.call(null,null);
        },form.State];
       });
      }
     },
     Formlet:{
      ApplyLayout:function(formlet)
      {
       return Data.OfIFormlet(Data.PropagateRenderFrom(formlet,Data.BaseFormlet().ApplyLayout(formlet)));
      },
      Bind:function(fl,f)
      {
       var arg10;
       arg10=function(x)
       {
        return f(x);
       };
       return Data.OfIFormlet(Data.PropagateRenderFrom(fl,Data.BaseFormlet().Bind(fl,arg10)));
      },
      BindWith:function(compose,formlet,f)
      {
       var arg20;
       arg20=function(x)
       {
        return f(x);
       };
       return Data.OfIFormlet(Data.PropagateRenderFrom(formlet,Data.BaseFormlet().BindWith(compose,formlet,arg20)));
      },
      BuildForm:function(f)
      {
       return Data.BaseFormlet().BuildForm(f);
      },
      BuildFormlet:function(f)
      {
       return Data.MkFormlet(f);
      },
      Choose:function(fs)
      {
       var count,fs1,formlet,x1,arg00;
       count={
        contents:0
       };
       fs1=Seq.map(function(f)
       {
        return Formlet2.LiftResult(Formlet2.InitWithFailure(Formlet2.Map(function(x)
        {
         Operators1.Increment(count);
         return[x,count.contents];
        },f)));
       },fs);
       formlet=Formlet2.Sequence(fs1);
       x1=Formlet2.Map(function(xs)
       {
        var x,x3;
        x=List.choose(function(x2)
        {
         return x2.$==0?{
          $:1,
          $0:x2.$0
         }:{
          $:0
         };
        },xs);
        x3=List.rev(List.sortBy(Runtime.Tupled(function(tupledArg)
        {
         return tupledArg[1];
        }),x));
        return Seq.tryPick(Runtime.Tupled(function(tupledArg)
        {
         return{
          $:1,
          $0:tupledArg[0]
         };
        }),x3);
       },formlet);
       arg00=function(x)
       {
        return x.$==1;
       };
       return Formlet2.Map(function(x)
       {
        return x.$0;
       },Data.Validator().Is(arg00,"",x1));
      },
      Delay:function(f)
      {
       return Data.OfIFormlet(Data.BaseFormlet().Delay(function()
       {
        return f(null);
       }));
      },
      Deletable:function(formlet)
      {
       return Data.OfIFormlet(Data.PropagateRenderFrom(formlet,Data.BaseFormlet().Deletable(formlet)));
      },
      Do:Runtime.Field(function()
      {
       return FormletBuilder.New();
      }),
      Empty:function()
      {
       return Data.OfIFormlet(Data.BaseFormlet().Empty());
      },
      FailWith:function(fs)
      {
       return Data.OfIFormlet(Data.BaseFormlet().FailWith(fs));
      },
      FlipBody:function(formlet)
      {
       return Data.OfIFormlet(Data.PropagateRenderFrom(formlet,Data.BaseFormlet().FlipBody(formlet)));
      },
      Flowlet:function(formlet)
      {
       return Data.OfIFormlet(Data.PropagateRenderFrom(formlet,Data.BaseFormlet().WithLayout(Data.Layout().get_Flowlet(),formlet)));
      },
      Horizontal:function(formlet)
      {
       return Data.OfIFormlet(Data.PropagateRenderFrom(formlet,Data.BaseFormlet().WithLayout(Data.Layout().get_Horizontal(),formlet)));
      },
      InitWith:function(value,formlet)
      {
       return Data.OfIFormlet(Data.PropagateRenderFrom(formlet,Data.BaseFormlet().InitWith(value,formlet)));
      },
      InitWithFailure:function(formlet)
      {
       return Data.OfIFormlet(Data.PropagateRenderFrom(formlet,Data.BaseFormlet().InitWithFailure(formlet)));
      },
      Join:function(formlet)
      {
       var x;
       x=Formlet2.Map(function(f)
       {
        return f;
       },formlet);
       return Data.OfIFormlet(Data.PropagateRenderFrom(formlet,Data.BaseFormlet().Join(x)));
      },
      LiftResult:function(formlet)
      {
       return Data.OfIFormlet(Data.PropagateRenderFrom(formlet,Data.BaseFormlet().LiftResult(formlet)));
      },
      Map:function(f,formlet)
      {
       return Data.OfIFormlet(Data.PropagateRenderFrom(formlet,Data.BaseFormlet().Map(f,formlet)));
      },
      MapBody:function(f,formlet)
      {
       return Data.OfIFormlet(Data.PropagateRenderFrom(formlet,Data.BaseFormlet().MapBody(f,formlet)));
      },
      MapElement:function(f,formlet)
      {
       return Data.OfIFormlet(Data.PropagateRenderFrom(formlet,Data.BaseFormlet().MapBody(function(b)
       {
        return Runtime.New(Body,{
         Element:f(b.Element),
         Label:b.Label
        });
       },formlet)));
      },
      MapResult:function(f,formlet)
      {
       return Data.OfIFormlet(Data.PropagateRenderFrom(formlet,Data.BaseFormlet().MapResult(f,formlet)));
      },
      Never:function()
      {
       return Data.OfIFormlet(Data.BaseFormlet().Never());
      },
      New:function(f)
      {
       return Data.OfIFormlet(Data.BaseFormlet().New(f));
      },
      OfElement:function(genElem)
      {
       return Data.MkFormlet(function()
       {
        return[genElem(null),function()
        {
        },Data.RX().Return(Runtime.New(Result,{
         $:0,
         $0:null
        }))];
       });
      },
      Render:function(formlet)
      {
       return Data.PropagateRenderFrom(formlet,formlet.Run(function()
       {
       }));
      },
      Replace:function(formlet,f)
      {
       var arg10;
       arg10=function(x)
       {
        return f(x);
       };
       return Data.OfIFormlet(Data.PropagateRenderFrom(formlet,Data.BaseFormlet().Replace(formlet,arg10)));
      },
      ReplaceFirstWithFailure:function(formlet)
      {
       return Data.OfIFormlet(Data.PropagateRenderFrom(formlet,Data.BaseFormlet().ReplaceFirstWithFailure(formlet)));
      },
      Return:function(x)
      {
       return Data.OfIFormlet(Data.BaseFormlet().Return(x));
      },
      ReturnEmpty:function(x)
      {
       return Data.OfIFormlet(Data.BaseFormlet().ReturnEmpty(x));
      },
      Run:function(f,formlet)
      {
       return formlet.Run(f);
      },
      SelectMany:function(formlet)
      {
       var x;
       x=Formlet2.Map(function(f)
       {
        return f;
       },formlet);
       return Data.OfIFormlet(Data.PropagateRenderFrom(formlet,Data.BaseFormlet().SelectMany(x)));
      },
      Sequence:function(fs)
      {
       var x;
       x=Seq.map(function(x1)
       {
        return x1;
       },fs);
       return Data.OfIFormlet(Data.BaseFormlet().Sequence(x));
      },
      Switch:function(formlet)
      {
       var x;
       x=Formlet2.Map(function(f)
       {
        return f;
       },formlet);
       return Data.OfIFormlet(Data.PropagateRenderFrom(formlet,Data.BaseFormlet().Switch(x)));
      },
      Vertical:function(formlet)
      {
       return Data.OfIFormlet(Data.PropagateRenderFrom(formlet,Data.BaseFormlet().WithLayout(Data.Layout().get_Vertical(),formlet)));
      },
      WithCancelation:function(formlet,c)
      {
       return Data.OfIFormlet(Data.PropagateRenderFrom(formlet,Data.BaseFormlet().WithCancelation(formlet,c)));
      },
      WithLabel:function(label,formlet)
      {
       return Data.OfIFormlet(Data.PropagateRenderFrom(formlet,Data.BaseFormlet().MapBody(function(body)
       {
        return Runtime.New(Body,{
         Element:body.Element,
         Label:label
        });
       },formlet)));
      },
      WithLayout:function(l,formlet)
      {
       return Data.OfIFormlet(Data.PropagateRenderFrom(formlet,Data.BaseFormlet().WithLayout(l,formlet)));
      },
      WithLayoutOrDefault:function(formlet)
      {
       return Data.OfIFormlet(Data.PropagateRenderFrom(formlet,Data.BaseFormlet().WithLayoutOrDefault(formlet)));
      },
      WithNotification:function(c,formlet)
      {
       return Data.OfIFormlet(Data.PropagateRenderFrom(formlet,Data.BaseFormlet().WithNotification(c,formlet)));
      },
      WithNotificationChannel:function(formlet)
      {
       return Data.OfIFormlet(Data.PropagateRenderFrom(formlet,Data.BaseFormlet().WithNotificationChannel(formlet)));
      }
     },
     FormletBuilder:Runtime.Class({
      Bind:function(formlet,f)
      {
       var arg10;
       arg10=function(x)
       {
        return f(x);
       };
       return Data.OfIFormlet(Data.PropagateRenderFrom(formlet,Data.BaseFormlet().Bind(formlet,arg10)));
      },
      Delay:function(f)
      {
       return Data.OfIFormlet(Data.BaseFormlet().Delay(function(x)
       {
        return f(x);
       }));
      },
      Return:function(x)
      {
       return Data.OfIFormlet(Data.BaseFormlet().Return(x));
      },
      ReturnFrom:function(f)
      {
       return Data.OfIFormlet(f);
      }
     },{
      New:function()
      {
       return Runtime.New(this,{});
      }
     }),
     Layout:{
      FormRowConfiguration:Runtime.Class({},{
       get_Default:function()
       {
        return Runtime.New(FormRowConfiguration,{
         Padding:{
          $:0
         },
         Color:{
          $:0
         },
         Class:{
          $:0
         },
         Style:{
          $:0
         },
         LabelConfiguration:{
          $:0
         }
        });
       }
      }),
      LabelConfiguration:Runtime.Class({},{
       get_Default:function()
       {
        return Runtime.New(LabelConfiguration,{
         Align:{
          $:0
         },
         VerticalAlign:{
          $:1
         },
         Placement:{
          $:0
         }
        });
       }
      }),
      Padding:Runtime.Class({},{
       get_Default:function()
       {
        return Runtime.New(Padding1,{
         Left:{
          $:0
         },
         Right:{
          $:0
         },
         Top:{
          $:0
         },
         Bottom:{
          $:0
         }
        });
       }
      })
     },
     LayoutProvider:Runtime.Class({
      ColumnLayout:function(rowConfig)
      {
       var objectArg,_this=this;
       objectArg=this.LayoutUtils;
       return objectArg.New(function()
       {
        var row,container,store,insert,remove;
        row=Default.TR(Runtime.New(T,{
         $:0
        }));
        container=Default.Table(List.ofArray([Default.TBody(List.ofArray([row]))]));
        store=ElementStore.NewElementStore();
        insert=function(rowIx)
        {
         return function(body)
         {
          var elemId,newCol,jqPanel,index,inserted;
          elemId=body.Element.get_Id();
          newCol=Default.TD(List.ofArray([Default.Table(List.ofArray([Default.TBody(List.ofArray([_this.MakeRow(rowConfig,rowIx,body)]))]))]));
          jqPanel=jQuery(row.Body);
          index={
           contents:0
          };
          inserted={
           contents:false
          };
          jqPanel.children().each(function()
          {
           var jqCol;
           jqCol=jQuery(this);
           if(rowIx===index.contents)
            {
             jQuery(newCol.Body).insertBefore(jqCol);
             newCol.Render();
             inserted.contents=true;
            }
           return Operators1.Increment(index);
          });
          if(!inserted.contents)
           {
            row.AppendI(newCol);
           }
          return store.RegisterElement(elemId,function()
          {
           return newCol["HtmlProvider@32"].Remove(newCol.Body);
          });
         };
        };
        remove=function(elems)
        {
         var enumerator;
         enumerator=Enumerator.Get(elems);
         while(enumerator.MoveNext())
          {
           store.Remove(enumerator.get_Current().Element.get_Id());
          }
         return;
        };
        return{
         Body:Runtime.New(Body,{
          Element:container,
          Label:{
           $:0
          }
         }),
         SyncRoot:null,
         Insert:insert,
         Remove:remove
        };
       });
      },
      HorizontalAlignElem:function(align,el)
      {
       var arg10;
       arg10="float:"+(align.$==0?"left":"right")+";";
       return Operators.add(Default.Div(List.ofArray([Default.Attr().NewAttr("style",arg10)])),List.ofArray([el]));
      },
      LabelLayout:function(lc)
      {
       var inputRecord;
       inputRecord=FormRowConfiguration.get_Default();
       return this.RowLayout(Runtime.New(FormRowConfiguration,{
        Padding:inputRecord.Padding,
        Color:inputRecord.Color,
        Class:inputRecord.Class,
        Style:inputRecord.Style,
        LabelConfiguration:{
         $:1,
         $0:lc
        }
       }));
      },
      MakeLayout:function(lm)
      {
       var objectArg;
       objectArg=this.LayoutUtils;
       return objectArg.New(function()
       {
        var lm1,store,insert,remove;
        lm1=lm(null);
        store=ElementStore.NewElementStore();
        insert=function(ix)
        {
         return function(bd)
         {
          var elemId,newElems;
          elemId=bd.Element.get_Id();
          newElems=(lm1.Insert.call(null,ix))(bd);
          return store.RegisterElement(elemId,function()
          {
           var enumerator,e;
           enumerator=Enumerator.Get(newElems);
           while(enumerator.MoveNext())
            {
             e=enumerator.get_Current();
             e["HtmlProvider@32"].Remove(e.Body);
            }
           return;
          });
         };
        };
        remove=function(elems)
        {
         var enumerator;
         enumerator=Enumerator.Get(elems);
         while(enumerator.MoveNext())
          {
           store.Remove(enumerator.get_Current().Element.get_Id());
          }
         return;
        };
        return{
         Body:Runtime.New(Body,{
          Element:lm1.Panel,
          Label:{
           $:0
          }
         }),
         SyncRoot:null,
         Insert:insert,
         Remove:remove
        };
       });
      },
      MakeRow:function(rowConfig,rowIndex,body)
      {
       var x,d,padding,x2,paddingLeft,x3,paddingTop,x4,paddingRight,x5,paddingBottom,makeCell,elem1,matchValue,cells,labelGen,x8,d1,labelConf,x9,arg00,label,matchValue1,xa,xb,xc,d2,rowClass,xd,d3,rowColorStyleProp,xe,d4,matchValue2,rowStyle,arg002;
       x=rowConfig.Padding;
       d=Padding1.get_Default();
       padding=Utils.Maybe(d,function(x1)
       {
        return x1;
       },x);
       x2=padding.Left;
       paddingLeft=Utils.Maybe(0,function(x1)
       {
        return x1;
       },x2);
       x3=padding.Top;
       paddingTop=Utils.Maybe(0,function(x1)
       {
        return x1;
       },x3);
       x4=padding.Right;
       paddingRight=Utils.Maybe(0,function(x1)
       {
        return x1;
       },x4);
       x5=padding.Bottom;
       paddingBottom=Utils.Maybe(0,function(x1)
       {
        return x1;
       },x5);
       makeCell=function(l)
       {
        return function(t)
        {
         return function(r)
         {
          return function(b)
          {
           return function(csp)
           {
            return function(valign)
            {
             return function(elem)
             {
              var x1,mapping,x6,paddingStyle,arg10;
              x1=List.ofArray([["padding-left: ",l],["padding-top: ",t],["padding-right: ",r],["padding-bottom: ",b]]);
              mapping=Runtime.Tupled(function(tupledArg)
              {
               return tupledArg[0]+Global.String(tupledArg[1])+"px;";
              });
              x6=List.map(mapping,x1);
              paddingStyle=Seq.reduce(function(x7)
              {
               return function(y)
               {
                return x7+y;
               };
              },x6);
              arg10=paddingStyle+";"+Utils.Maybe("",function(valign1)
              {
               return"vertical-align: "+(valign1.$==1?"middle":valign1.$==2?"bottom":"top")+";";
              },valign);
              return Default.TD(List.append(Runtime.New(T,{
               $:1,
               $0:Default.Attr().NewAttr("style",arg10),
               $1:csp?List.ofArray([Default.Attr().NewAttr("colspan","2")]):Runtime.New(T,{
                $:0
               })
              }),List.ofArray([elem])));
             };
            };
           };
          };
         };
        };
       };
       elem1=body.Element;
       matchValue=body.Label;
       if(matchValue.$==1)
        {
         labelGen=matchValue.$0;
         x8=rowConfig.LabelConfiguration;
         d1=LabelConfiguration.get_Default();
         labelConf=Utils.Maybe(d1,function(x1)
         {
          return x1;
         },x8);
         x9=labelGen(null);
         arg00=labelConf.Align;
         label=this.HorizontalAlignElem(arg00,x9);
         matchValue1=labelConf.Placement;
         if(matchValue1.$==3)
          {
           xa=Utils.InTable(List.ofArray([List.ofArray([elem1]),List.ofArray([label])]));
           cells=List.ofArray([((((((makeCell(paddingLeft))(paddingTop))(paddingRight))(paddingBottom))(true))({
            $:0
           }))(xa)]);
          }
         else
          {
           if(matchValue1.$==0)
            {
             cells=List.ofArray([((((((makeCell(paddingLeft))(paddingTop))(0))(paddingBottom))(false))({
              $:1,
              $0:labelConf.VerticalAlign
             }))(label),((((((makeCell(0))(paddingTop))(paddingRight))(paddingBottom))(false))({
              $:0
             }))(elem1)]);
            }
           else
            {
             if(matchValue1.$==1)
              {
               cells=List.ofArray([((((((makeCell(paddingLeft))(paddingTop))(0))(paddingBottom))(false))({
                $:1,
                $0:labelConf.VerticalAlign
               }))(elem1),((((((makeCell(0))(paddingTop))(paddingRight))(paddingBottom))(false))({
                $:0
               }))(label)]);
              }
             else
              {
               xb=Utils.InTable(List.ofArray([List.ofArray([label]),List.ofArray([elem1])]));
               cells=List.ofArray([((((((makeCell(paddingLeft))(paddingTop))(paddingRight))(paddingBottom))(true))({
                $:0
               }))(xb)]);
              }
            }
          }
        }
       else
        {
         cells=List.ofArray([((((((makeCell(paddingLeft))(paddingTop))(paddingRight))(paddingBottom))(true))({
          $:0
         }))(elem1)]);
        }
       xc=rowConfig.Class;
       d2=Runtime.New(T,{
        $:0
       });
       rowClass=Utils.Maybe(d2,function(classGen)
       {
        var arg001;
        arg001=classGen(rowIndex);
        return List.ofArray([Default.Attr().Class(arg001)]);
       },xc);
       xd=rowConfig.Color;
       d3=Runtime.New(T,{
        $:0
       });
       rowColorStyleProp=Utils.Maybe(d3,function(colGen)
       {
        return List.ofArray(["background-color: "+colGen(rowIndex)]);
       },xd);
       xe=rowConfig.Style;
       d4=Runtime.New(T,{
        $:0
       });
       matchValue2=List.append(rowColorStyleProp,Utils.Maybe(d4,function(styleGen)
       {
        return List.ofArray([styleGen(rowIndex)]);
       },xe));
       if(matchValue2.$==0)
        {
         rowStyle=Runtime.New(T,{
          $:0
         });
        }
       else
        {
         arg002=Seq.reduce(function(x1)
         {
          return function(y)
          {
           return x1+";"+y;
          };
         },matchValue2);
         rowStyle=List.ofArray([Default.Attr().NewAttr("style",arg002)]);
        }
       return Default.TR(List.append(rowClass,List.append(rowStyle,List.append(rowStyle,cells))));
      },
      RowLayout:function(rowConfig)
      {
       var objectArg,_this=this;
       objectArg=this.LayoutUtils;
       return objectArg.New(function()
       {
        var panel,container,store,insert,remove;
        panel=Default.TBody(Runtime.New(T,{
         $:0
        }));
        container=Default.Table(List.ofArray([panel]));
        store=ElementStore.NewElementStore();
        insert=function(rowIx)
        {
         return function(body)
         {
          var elemId,row,jqPanel,index,inserted;
          elemId=body.Element.get_Id();
          row=_this.MakeRow(rowConfig,rowIx,body);
          jqPanel=jQuery(panel.Body);
          index={
           contents:0
          };
          inserted={
           contents:false
          };
          jqPanel.children().each(function()
          {
           var jqRow;
           jqRow=jQuery(this);
           if(rowIx===index.contents)
            {
             jQuery(row.Body).insertBefore(jqRow);
             row.Render();
             inserted.contents=true;
            }
           return Operators1.Increment(index);
          });
          if(!inserted.contents)
           {
            panel.AppendI(row);
           }
          return store.RegisterElement(elemId,function()
          {
           return row["HtmlProvider@32"].Remove(row.Body);
          });
         };
        };
        remove=function(elems)
        {
         var enumerator;
         enumerator=Enumerator.Get(elems);
         while(enumerator.MoveNext())
          {
           store.Remove(enumerator.get_Current().Element.get_Id());
          }
         return;
        };
        return{
         Body:Runtime.New(Body,{
          Element:container,
          Label:{
           $:0
          }
         }),
         SyncRoot:null,
         Insert:insert,
         Remove:remove
        };
       });
      },
      VerticalAlignedTD:function(valign,elem)
      {
       var valign1,cell;
       valign1=valign.$==1?"middle":valign.$==2?"bottom":"top";
       cell=Default.TD(List.ofArray([elem]));
       cell["HtmlProvider@32"].SetCss(cell.Body,"vertical-align",valign1);
       return cell;
      },
      get_Flowlet:function()
      {
       return this.MakeLayout(function()
       {
        var panel;
        panel=Default.Div(Runtime.New(T,{
         $:0
        }));
        return{
         Insert:function()
         {
          return function(bd)
          {
           var nextScreen;
           nextScreen=Utils.InTable(List.ofArray([List.ofArray([bd.Label.$==1?bd.Label.$0.call(null,null):Default.Span(Runtime.New(T,{
            $:0
           })),Default.Div(List.ofArray([bd.Element]))])]));
           panel["HtmlProvider@32"].Clear(panel.Body);
           panel.AppendI(nextScreen);
           return List.ofArray([nextScreen]);
          };
         },
         Panel:panel
        };
       });
      },
      get_Horizontal:function()
      {
       return this.ColumnLayout(FormRowConfiguration.get_Default());
      },
      get_Vertical:function()
      {
       return this.RowLayout(FormRowConfiguration.get_Default());
      }
     },{
      New:function(LayoutUtils1)
      {
       var r;
       r=Runtime.New(this,{});
       r.LayoutUtils=LayoutUtils1;
       return r;
      }
     }),
     Utils:{
      InTable:function(rows)
      {
       return Default.Table(List.ofArray([Default.TBody(List.map(function(cols)
       {
        return Default.TR(List.map(function(c)
        {
         return Default.TD(List.ofArray([c]));
        },cols));
       },rows))]));
      },
      MapOption:function(f,value)
      {
       return value.$==1?{
        $:1,
        $0:f(value.$0)
       }:{
        $:0
       };
      },
      Maybe:function(d,f,o)
      {
       return o.$==0?d:f(o.$0);
      }
     }
    }
   }
  }
 });
 Runtime.OnInit(function()
 {
  WebSharper=Runtime.Safe(Global.IntelliFactory.WebSharper);
  Formlet=Runtime.Safe(WebSharper.Formlet);
  Body=Runtime.Safe(Formlet.Body);
  Controls=Runtime.Safe(Formlet.Controls);
  Html=Runtime.Safe(WebSharper.Html);
  Default=Runtime.Safe(Html.Default);
  List=Runtime.Safe(WebSharper.List);
  Data=Runtime.Safe(Formlet.Data);
  Reactive=Runtime.Safe(Global.IntelliFactory.Reactive);
  HotStream=Runtime.Safe(Reactive.HotStream);
  Formlet1=Runtime.Safe(Global.IntelliFactory.Formlet);
  Base=Runtime.Safe(Formlet1.Base);
  Result=Runtime.Safe(Base.Result);
  T=Runtime.Safe(List.T);
  Operators=Runtime.Safe(Html.Operators);
  jQuery=Runtime.Safe(Global.jQuery);
  EventsPervasives=Runtime.Safe(Html.EventsPervasives);
  Formlet2=Runtime.Safe(Formlet.Formlet);
  Operators1=Runtime.Safe(WebSharper.Operators);
  CssConstants=Runtime.Safe(Formlet.CssConstants);
  Math=Runtime.Safe(Global.Math);
  Seq=Runtime.Safe(WebSharper.Seq);
  Utils=Runtime.Safe(Formlet.Utils);
  Tree=Runtime.Safe(Base.Tree);
  Edit=Runtime.Safe(Tree.Edit);
  Form=Runtime.Safe(Base.Form);
  Arrays=Runtime.Safe(WebSharper.Arrays);
  FormletProvider=Runtime.Safe(Base.FormletProvider);
  Formlet3=Runtime.Safe(Data.Formlet);
  Util=Runtime.Safe(WebSharper.Util);
  LayoutProvider=Runtime.Safe(Formlet.LayoutProvider);
  LayoutUtils=Runtime.Safe(Base.LayoutUtils);
  Reactive1=Runtime.Safe(Reactive.Reactive);
  Validator=Runtime.Safe(Base.Validator);
  ValidatorProvidor=Runtime.Safe(Data.ValidatorProvidor);
  RegExp=Runtime.Safe(Global.RegExp);
  Collections=Runtime.Safe(WebSharper.Collections);
  Dictionary=Runtime.Safe(Collections.Dictionary);
  ElementStore=Runtime.Safe(Formlet.ElementStore);
  Enhance=Runtime.Safe(Formlet.Enhance);
  FormButtonConfiguration=Runtime.Safe(Enhance.FormButtonConfiguration);
  FormContainerConfiguration=Runtime.Safe(Enhance.FormContainerConfiguration);
  Padding=Runtime.Safe(Enhance.Padding);
  ManyConfiguration=Runtime.Safe(Enhance.ManyConfiguration);
  ValidationFrameConfiguration=Runtime.Safe(Enhance.ValidationFrameConfiguration);
  ValidationIconConfiguration=Runtime.Safe(Enhance.ValidationIconConfiguration);
  JSON=Runtime.Safe(Global.JSON);
  FormletBuilder=Runtime.Safe(Formlet.FormletBuilder);
  Layout=Runtime.Safe(Formlet.Layout);
  FormRowConfiguration=Runtime.Safe(Layout.FormRowConfiguration);
  LabelConfiguration=Runtime.Safe(Layout.LabelConfiguration);
  Padding1=Runtime.Safe(Layout.Padding);
  return Enumerator=Runtime.Safe(WebSharper.Enumerator);
 });
 Runtime.OnLoad(function()
 {
  Formlet2.Do();
  Data.Validator();
  Data.RX();
  Data.Layout();
  Data.DefaultLayout();
  CssConstants.InputTextClass();
  return;
 });
}());

(function()
{
 var Global=this,Runtime=this.IntelliFactory.Runtime,WebSharper,IntrinsicFunctionProxy,Concurrency,Array,Seq,UI,Next,Abbrev,Fresh,Collections,HashSet,HashSet1,HashSet2,Arrays,JQueue,Unchecked,Slot,An,AppendList,Anims,window,Trans1,Option,View1,Lazy,Array1,Attrs,DomUtility,Attr,AnimatedAttrNode,Trans,DynamicAttrNode,View,Docs,Doc,List,Var,T,Mailbox,Operators,NodeSet,DocElemNode,DomNodes,jQuery,document,Easing,Easings,Var1,FlowBuilder,Flow,Html,Elements,Input,DoubleInterpolation,Key,ListModels,ListModel1,Model,Model1,Strings,encodeURIComponent,decodeURIComponent,Route,Routing,Trie,Router,Dictionary,Snap,Async,Enumerator,ResizeArray,ResizeArrayProxy,MapModule,FSharpMap,ViewBuilder,Attributes,SvgAttributes;
 Runtime.Define(Global,{
  IntelliFactory:{
   WebSharper:{
    UI:{
     Next:{
      Abbrev:{
       Array:{
        MapReduce:function(f,z,re,a)
        {
         var loop;
         loop=function(off,len)
         {
          var l2,a1,b,l21,a2,b1;
          if(len<=0)
           {
            return z;
           }
          else
           {
            if(len===1)
             {
              if(off>=0?off<IntrinsicFunctionProxy.GetLength(a):false)
               {
                return f(a[off]);
               }
              else
               {
                l2=len/2>>0;
                a1=loop(off,l2);
                b=loop(off+l2,len-l2);
                return(re(a1))(b);
               }
             }
            else
             {
              l21=len/2>>0;
              a2=loop(off,l21);
              b1=loop(off+l21,len-l21);
              return(re(a2))(b1);
             }
           }
         };
         return loop(0,IntrinsicFunctionProxy.GetLength(a));
        }
       },
       Async:{
        Schedule:function(f)
        {
         return Concurrency.Start(Concurrency.Delay(function()
         {
          return Concurrency.Return(f(null));
         }));
        },
        StartTo:function(comp,k)
        {
         var c3;
         c3=function()
         {
         };
         return Concurrency.StartWithContinuations(comp,k,function()
         {
         });
        }
       },
       Dict:{
        ToKeyArray:function(d)
        {
         var arr;
         arr=Array(d.count);
         Seq.iteri(function(i)
         {
          return function(kv)
          {
           arr[i]=kv.K;
          };
         },d);
         return arr;
        },
        ToValueArray:function(d)
        {
         var arr;
         arr=Array(d.count);
         Seq.iteri(function(i)
         {
          return function(kv)
          {
           arr[i]=kv.V;
          };
         },d);
         return arr;
        }
       },
       Fresh:{
        Id:function()
        {
         var _;
         _=Fresh.counter()+1;
         Fresh.counter=function()
         {
          return _;
         };
         return"uid"+Global.String(Fresh.counter());
        },
        Int:function()
        {
         var _;
         _=Fresh.counter()+1;
         Fresh.counter=function()
         {
          return _;
         };
         return Fresh.counter();
        },
        counter:Runtime.Field(function()
        {
         return 0;
        })
       },
       HashSet:{
        Except:function(excluded,included)
        {
         var set;
         set=HashSet1.New11(HashSet2.ToArray(included));
         set.ExceptWith(HashSet2.ToArray(excluded));
         return set;
        },
        Filter:function(ok,set)
        {
         return HashSet1.New11(Arrays.filter(ok,HashSet2.ToArray(set)));
        },
        Intersect:function(a,b)
        {
         var set;
         set=HashSet1.New11(HashSet2.ToArray(a));
         set.IntersectWith(HashSet2.ToArray(b));
         return set;
        },
        ToArray:function(set)
        {
         var arr;
         arr=Array(set.get_Count());
         set.CopyTo(arr);
         return arr;
        }
       },
       JQueue:{
        Add:function($x,$q)
        {
         var $0=this,$this=this;
         return $q.push($x);
        },
        Count:function(q)
        {
         return q.length;
        },
        Dequeue:function($q)
        {
         var $0=this,$this=this;
         return $q.shift();
        },
        Iter:function(f,q)
        {
         return Arrays.iter(f,JQueue.ToArray(q));
        },
        ToArray:function(q)
        {
         return q.slice();
        }
       },
       Mailbox:{
        StartProcessor:function(proc)
        {
         var mail,isActive,work;
         mail=[];
         isActive={
          contents:false
         };
         work=Concurrency.Delay(function()
         {
          var a,b;
          a=Concurrency.While(function()
          {
           return JQueue.Count(mail)>0;
          },Concurrency.Delay(function()
          {
           return Concurrency.Bind(proc(JQueue.Dequeue(mail)),function()
           {
            return Concurrency.Return(null);
           });
          }));
          b=Concurrency.Delay(function()
          {
           return Concurrency.Return(void(isActive.contents=false));
          });
          return Concurrency.Bind(a,function()
          {
           return b;
          });
         });
         return function(msg)
         {
          JQueue.Add(msg,mail);
          if(!isActive.contents)
           {
            isActive.contents=true;
            return Concurrency.Start(work);
           }
          else
           {
            return null;
           }
         };
        }
       },
       Slot:Runtime.Class({
        Equals:function(o)
        {
         return Unchecked.Equals(this.key.call(null,this.value),this.key.call(null,o.get_Value()));
        },
        GetHashCode:function()
        {
         return Unchecked.Hash(this.key.call(null,this.value));
        },
        get_Value:function()
        {
         return this.value;
        }
       },{
        Create:function(key,value)
        {
         return Slot.New(key,value);
        },
        New:function(key,value)
        {
         var r;
         r=Runtime.New(this,{});
         r.key=key;
         r.value=value;
         return r;
        }
       }),
       U:function()
       {
        return;
       }
      },
      An:Runtime.Class({},{
       Append:function(_arg2,_arg1)
       {
        return Runtime.New(An,{
         $:0,
         $0:AppendList.Append(_arg2.$0,_arg1.$0)
        });
       },
       Concat:function(xs)
       {
        return Runtime.New(An,{
         $:0,
         $0:AppendList.Concat(Seq.map(function(_arg00_)
         {
          return Anims.List(_arg00_);
         },xs))
        });
       },
       Const:function(v)
       {
        return Anims.Const(v);
       },
       Delayed:function(inter,easing,dur,delay,x,y)
       {
        return{
         Compute:function(t)
         {
          return t<=delay?x:inter.Interpolate(easing.TransformTime.call(null,(t-delay)/dur),x,y);
         },
         Duration:dur+delay
        };
       },
       Map:function(f,anim)
       {
        var f1;
        f1=anim.Compute;
        return Anims.Def(anim.Duration,function(x)
        {
         return f(f1(x));
        });
       },
       Pack:function(anim)
       {
        return Runtime.New(An,{
         $:0,
         $0:AppendList.Single({
          $:1,
          $0:anim
         })
        });
       },
       Play:function(anim)
       {
        return Concurrency.Delay(function()
        {
         return Concurrency.Bind(An.Run(function()
         {
         },Anims.Actions(anim)),function()
         {
          return Concurrency.Return(Anims.Finalize(anim));
         });
        });
       },
       Run:function(k,anim)
       {
        var dur,arg00;
        dur=anim.Duration;
        arg00=Runtime.Tupled(function(tupledArg)
        {
         var ok,start,loop;
         ok=tupledArg[0];
         start=function()
         {
          window.requestAnimationFrame(function(t)
          {
           return loop(t,t);
          });
         };
         loop=function(start1,now)
         {
          var t;
          t=now-start1;
          k(anim.Compute.call(null,t));
          return t<=dur?void window.requestAnimationFrame(function(t1)
          {
           return loop(start1,t1);
          }):ok(null);
         };
         return start(null);
        });
        return Concurrency.FromContinuations(function(ok)
        {
         return function(no)
         {
          return arg00([ok,no,function()
          {
          }]);
         };
        });
       },
       Simple:function(inter,easing,dur,x,y)
       {
        return{
         Compute:function(t)
         {
          return inter.Interpolate(easing.TransformTime.call(null,t/dur),x,y);
         },
         Duration:dur
        };
       },
       WhenDone:function(f,main)
       {
        return An.Append(Runtime.New(An,{
         $:0,
         $0:AppendList.Single({
          $:0,
          $0:f
         })
        }),main);
       },
       get_Empty:function()
       {
        return Runtime.New(An,{
         $:0,
         $0:AppendList.Empty()
        });
       }
      }),
      AnimatedAttrNode:Runtime.Class({
       GetChangeAnim:function(parent)
       {
        var matchValue,a=this;
        matchValue=[this.visible,this.logical];
        return An.WhenDone(function()
        {
         return a.sync(parent);
        },matchValue[0].$==1?matchValue[1].$==1?a.dirty?An.Pack(An.Map(function(v)
        {
         return a.pushVisible(parent,v);
        },Trans1.AnimateChange(a.tr,matchValue[0].$0,matchValue[1].$0))):An.get_Empty():An.get_Empty():An.get_Empty());
       },
       GetEnterAnim:function(parent)
       {
        var matchValue,a=this;
        matchValue=[this.visible,this.logical];
        return An.WhenDone(function()
        {
         return a.sync(parent);
        },matchValue[0].$==1?matchValue[1].$==1?a.dirty?An.Pack(An.Map(function(v)
        {
         return a.pushVisible(parent,v);
        },Trans1.AnimateChange(a.tr,matchValue[0].$0,matchValue[1].$0))):matchValue[0].$==0?matchValue[1].$==1?An.Pack(An.Map(function(v)
        {
         return a.pushVisible(parent,v);
        },Trans1.AnimateEnter(a.tr,matchValue[1].$0))):An.get_Empty():An.get_Empty():matchValue[0].$==0?matchValue[1].$==1?An.Pack(An.Map(function(v)
        {
         return a.pushVisible(parent,v);
        },Trans1.AnimateEnter(a.tr,matchValue[1].$0))):An.get_Empty():An.get_Empty():matchValue[0].$==0?matchValue[1].$==1?An.Pack(An.Map(function(v)
        {
         return a.pushVisible(parent,v);
        },Trans1.AnimateEnter(a.tr,matchValue[1].$0))):An.get_Empty():An.get_Empty());
       },
       GetExitAnim:function(parent)
       {
        var matchValue,a=this;
        matchValue=this.visible;
        return An.WhenDone(function()
        {
         a.dirty=true;
         a.visible={
          $:0
         };
         return;
        },matchValue.$==1?An.Pack(An.Map(function(v)
        {
         return a.pushVisible(parent,v);
        },Trans1.AnimateExit(a.tr,matchValue.$0))):An.get_Empty());
       },
       Sync:function()
       {
        return null;
       },
       get_Changed:function()
       {
        return this.updates;
       },
       pushVisible:function(el,v)
       {
        this.visible={
         $:1,
         $0:v
        };
        this.dirty=true;
        return(this.push.call(null,el))(v);
       },
       sync:function(p)
       {
        if(this.dirty)
         {
          Option.iter(this.push.call(null,p),this.logical);
          this.visible=this.logical;
          this.dirty=false;
          return;
         }
        else
         {
          return null;
         }
       }
      },{
       New:function(tr,view,push)
       {
        var r;
        r=Runtime.New(this,{});
        r.tr=tr;
        r.push=push;
        r.logical={
         $:0
        };
        r.visible={
         $:0
        };
        r.dirty=true;
        r.updates=View1.Map(function(x)
        {
         r.logical={
          $:1,
          $0:x
         };
         r.dirty=true;
         return;
        },view);
        return r;
       }
      }),
      Anims:{
       Actions:function(_arg1)
       {
        return Anims.ConcatActions(Arrays.choose(function(_arg2)
        {
         return _arg2.$==1?{
          $:1,
          $0:_arg2.$0
         }:{
          $:0
         };
        },AppendList.ToArray(_arg1.$0)));
       },
       ConcatActions:function(xs)
       {
        var xs1,matchValue,dur,xs2;
        xs1=Seq.toArray(xs);
        matchValue=IntrinsicFunctionProxy.GetLength(xs1);
        if(matchValue===0)
         {
          return Anims.Const(null);
         }
        else
         {
          if(matchValue===1)
           {
            return xs1[0];
           }
          else
           {
            dur=Seq.max(Seq.map(function(anim)
            {
             return anim.Duration;
            },xs1));
            xs2=Arrays.map(function(anim)
            {
             return Anims.Prolong(dur,anim);
            },xs1);
            return Anims.Def(dur,function(t)
            {
             return Arrays.iter(function(anim)
             {
              return anim.Compute.call(null,t);
             },xs2);
            });
           }
         }
       },
       Const:function(v)
       {
        return Anims.Def(0,function()
        {
         return v;
        });
       },
       Def:function(d,f)
       {
        return{
         Compute:f,
         Duration:d
        };
       },
       Finalize:function(_arg1)
       {
        return Arrays.iter(function(_arg2)
        {
         return _arg2.$==0?_arg2.$0.call(null,null):null;
        },AppendList.ToArray(_arg1.$0));
       },
       List:function(_arg1)
       {
        return _arg1.$0;
       },
       Prolong:function(nextDuration,anim)
       {
        var comp,dur,last;
        comp=anim.Compute;
        dur=anim.Duration;
        last=Lazy.Create(function()
        {
         return anim.Compute.call(null,anim.Duration);
        });
        return{
         Compute:function(t)
         {
          return t>=dur?last.eval():comp(t);
         },
         Duration:nextDuration
        };
       }
      },
      AppendList:{
       Append:function(x,y)
       {
        var matchValue;
        matchValue=[x,y];
        return matchValue[0].$==0?matchValue[1]:matchValue[1].$==0?matchValue[0]:{
         $:2,
         $0:x,
         $1:y
        };
       },
       Concat:function(xs)
       {
        var a;
        a=Seq.toArray(xs);
        return Array1.MapReduce(function(x)
        {
         return x;
        },AppendList.Empty(),function(_arg00_)
        {
         return function(_arg10_)
         {
          return AppendList.Append(_arg00_,_arg10_);
         };
        },a);
       },
       Empty:function()
       {
        return{
         $:0
        };
       },
       FromArray:function(xs)
       {
        var matchValue;
        matchValue=xs.length;
        return matchValue===0?{
         $:0
        }:matchValue===1?{
         $:1,
         $0:xs[0]
        }:{
         $:3,
         $0:xs.slice()
        };
       },
       Single:function(x)
       {
        return{
         $:1,
         $0:x
        };
       },
       ToArray:function(xs)
       {
        var out,loop;
        out=[];
        loop=function(xs1)
        {
         var y;
         if(xs1.$==1)
          {
           return JQueue.Add(xs1.$0,out);
          }
         else
          {
           if(xs1.$==2)
            {
             y=xs1.$1;
             loop(xs1.$0);
             return loop(y);
            }
           else
            {
             return xs1.$==3?Arrays.iter(function(v)
             {
              return JQueue.Add(v,out);
             },xs1.$0):null;
            }
          }
        };
        loop(xs);
        return JQueue.ToArray(out);
       }
      },
      Attr:Runtime.Class({},{
       Animated:function(name,tr,view,attr)
       {
        return Attrs.Animated(tr,view,function(el)
        {
         return function(v)
         {
          return DomUtility.SetAttr(el,name,attr(v));
         };
        });
       },
       AnimatedStyle:function(name,tr,view,attr)
       {
        return Attrs.Animated(tr,view,function(el)
        {
         return function(v)
         {
          return DomUtility.SetStyle(el,name,attr(v));
         };
        });
       },
       Append:function(a,b)
       {
        return Attrs.Mk(a.Flags|b.Flags,Attrs.AppendTree(a.Tree,b.Tree));
       },
       Class:function(name)
       {
        return Attrs.Static(function(el)
        {
         return DomUtility.AddClass(el,name);
        });
       },
       Concat:function(xs)
       {
        var f,re,a;
        f=function(x)
        {
         return x;
        };
        re=function(arg00)
        {
         return function(arg10)
         {
          return Attr.Append(arg00,arg10);
         };
        };
        a=Seq.toArray(xs);
        return Array1.MapReduce(f,Attrs.EmptyAttr(),re,a);
       },
       Create:function(name,value)
       {
        return Attrs.Static(function(el)
        {
         return DomUtility.SetAttr(el,name,value);
        });
       },
       Dynamic:function(name,view)
       {
        return Attrs.Dynamic(view,function(el)
        {
         return function(v)
         {
          return DomUtility.SetAttr(el,name,v);
         };
        });
       },
       DynamicClass:function(name,view,ok)
       {
        return Attrs.Dynamic(view,function(el)
        {
         return function(v)
         {
          return ok(v)?DomUtility.AddClass(el,name):DomUtility.RemoveClass(el,name);
         };
        });
       },
       DynamicCustom:function(set,view)
       {
        return Attrs.Dynamic(view,set);
       },
       DynamicStyle:function(name,view)
       {
        return Attrs.Dynamic(view,function(el)
        {
         return function(v)
         {
          return DomUtility.SetStyle(el,name,v);
         };
        });
       },
       Handler:function(name,callback)
       {
        return Attrs.Static(function(el)
        {
         return el.addEventListener(name,callback,false);
        });
       },
       Style:function(name,value)
       {
        return Attrs.Static(function(el)
        {
         return DomUtility.SetStyle(el,name,value);
        });
       },
       get_Empty:function()
       {
        return Attrs.EmptyAttr();
       }
      }),
      Attrs:{
       Animated:function(tr,view,set)
       {
        var node,flags;
        node=AnimatedAttrNode.New(tr,view,set);
        flags=4;
        if(Trans1.CanAnimateEnter(tr))
         {
          flags=flags|1;
         }
        if(Trans.CanAnimateExit(tr))
         {
          flags=flags|2;
         }
        return Attrs.Mk(flags,{
         $:1,
         $0:node
        });
       },
       AppendTree:function(a,b)
       {
        var matchValue;
        matchValue=[a,b];
        return matchValue[0].$==0?matchValue[1]:matchValue[1].$==0?matchValue[0]:{
         $:2,
         $0:a,
         $1:b
        };
       },
       Dynamic:function(view,set)
       {
        return Attrs.Mk(0,{
         $:1,
         $0:DynamicAttrNode.New(view,set)
        });
       },
       EmptyAttr:Runtime.Field(function()
       {
        return Attrs.Mk(0,{
         $:0
        });
       }),
       GetAnim:function(dyn,f)
       {
        return An.Concat(Arrays.map(function(n)
        {
         return(f(n))(dyn.DynElem);
        },dyn.DynNodes));
       },
       GetChangeAnim:function(dyn)
       {
        return Attrs.GetAnim(dyn,function(n)
        {
         return function(arg00)
         {
          return n.GetChangeAnim(arg00);
         };
        });
       },
       GetEnterAnim:function(dyn)
       {
        return Attrs.GetAnim(dyn,function(n)
        {
         return function(arg00)
         {
          return n.GetEnterAnim(arg00);
         };
        });
       },
       GetExitAnim:function(dyn)
       {
        return Attrs.GetAnim(dyn,function(n)
        {
         return function(arg00)
         {
          return n.GetExitAnim(arg00);
         };
        });
       },
       HasChangeAnim:function(attr)
       {
        return(attr.DynFlags&4)!==0;
       },
       HasEnterAnim:function(attr)
       {
        return(attr.DynFlags&1)!==0;
       },
       HasExitAnim:function(attr)
       {
        return(attr.DynFlags&2)!==0;
       },
       Insert:function(elem,tree)
       {
        var nodes,loop;
        nodes=[];
        loop=function(node)
        {
         var b;
         if(node.$==1)
          {
           return JQueue.Add(node.$0,nodes);
          }
         else
          {
           if(node.$==2)
            {
             b=node.$1;
             loop(node.$0);
             return loop(b);
            }
           else
            {
             return node.$==3?node.$0.call(null,elem):null;
            }
          }
        };
        loop(tree.Tree);
        return{
         DynElem:elem,
         DynFlags:tree.Flags,
         DynNodes:JQueue.ToArray(nodes)
        };
       },
       Mk:function(flags,tree)
       {
        return Runtime.New(Attr,{
         Flags:flags,
         Tree:tree
        });
       },
       Static:function(attr)
       {
        return Attrs.Mk(0,{
         $:3,
         $0:attr
        });
       },
       Sync:function(elem,dyn)
       {
        return Arrays.iter(function(d)
        {
         return d.Sync(elem);
        },dyn.DynNodes);
       },
       Updates:function(dyn)
       {
        var p,a;
        p=function(x)
        {
         return function(y)
         {
          return View1.Map2(function()
          {
           return function()
           {
            return null;
           };
          },x,y);
         };
        };
        a=dyn.DynNodes;
        return Array1.MapReduce(function(x)
        {
         return x.get_Changed();
        },View.Const(null),p,a);
       }
      },
      Doc:Runtime.Class({},{
       Append:function(a,b)
       {
        var x;
        x=View1.Map2(function()
        {
         return function()
         {
          return null;
         };
        },a.Updates,b.Updates);
        return Docs.Mk({
         $:0,
         $0:a.DocNode,
         $1:b.DocNode
        },x);
       },
       Button:function(caption,attrs,action)
       {
        var attrs1;
        attrs1=Attr.Concat(attrs);
        return Doc.Elem(Doc.Clickable("button",action),attrs1,Doc.TextNode(caption));
       },
       CheckBox:function(show,items,chk)
       {
        var rvi,uid;
        rvi=View1.FromVar(chk);
        uid=Fresh.Id();
        return Doc.Concat(List.mapi(function(i)
        {
         return function(o)
         {
          var t,attrs,el,chkElem;
          t=Doc.TextNode(show(o));
          attrs=List.ofArray([Attr.Create("type","checkbox"),Attr.Create("name",uid),Attr.Create("value",Global.String(i))]);
          el=DomUtility.CreateElement("input");
          el.addEventListener("click",function()
          {
           var chkd,t1;
           chkd=el.checked;
           t1=Seq.nth(i,items);
           return Var.Update(chk,function(obs)
           {
            return Seq.toList(Seq.distinct(chkd?List.append(obs,List.ofArray([t1])):List.filter(function(x1)
            {
             return!Unchecked.Equals(x1,t1);
            },obs)));
           });
          },false);
          chkElem=Doc.Elem(el,Attr.Concat(attrs),Doc.get_Empty());
          return Doc.Element("div",Runtime.New(T,{
           $:0
          }),List.ofArray([chkElem,t]));
         };
        },items));
       },
       Clickable:function(elem,action)
       {
        var el;
        el=DomUtility.CreateElement(elem);
        el.addEventListener("click",function(ev)
        {
         ev.preventDefault();
         return action(null);
        },false);
        return el;
       },
       Concat:function(xs)
       {
        var a;
        a=Seq.toArray(xs);
        return Array1.MapReduce(function(x)
        {
         return x;
        },Doc.get_Empty(),function(arg00)
        {
         return function(arg10)
         {
          return Doc.Append(arg00,arg10);
         };
        },a);
       },
       Convert:function(render,view)
       {
        return Doc.Flatten(View1.Convert(render,view));
       },
       ConvertBy:function(key,render,view)
       {
        return Doc.Flatten(View1.ConvertBy(key,render,view));
       },
       ConvertSeq:function(render,view)
       {
        return Doc.Flatten(View1.ConvertSeq(render,view));
       },
       ConvertSeqBy:function(key,render,view)
       {
        return Doc.Flatten(View1.ConvertSeqBy(key,render,view));
       },
       Elem:function(name,attr,children)
       {
        var node,arg20,updates;
        node=Docs.CreateElemNode(name,attr,children.DocNode);
        arg20=children.Updates;
        updates=View1.Map2(function()
        {
         return function()
         {
          return null;
         };
        },Attrs.Updates(node.Attr),arg20);
        return Docs.Mk({
         $:1,
         $0:node
        },updates);
       },
       Element:function(name,attr,children)
       {
        var attr1,arg20;
        attr1=Attr.Concat(attr);
        arg20=Doc.Concat(children);
        return Doc.Elem(DomUtility.CreateElement(name),attr1,arg20);
       },
       EmbedView:function(view)
       {
        var node,x;
        node=Docs.CreateEmbedNode();
        x=View1.Map(function()
        {
        },View.Bind(function(doc)
        {
         Docs.UpdateEmbedNode(node,doc.DocNode);
         return doc.Updates;
        },view));
        return Docs.Mk({
         $:2,
         $0:node
        },x);
       },
       Flatten:function(view)
       {
        return Doc.EmbedView(View1.Map(function(arg00)
        {
         return Doc.Concat(arg00);
        },view));
       },
       Input:function(attr,_var)
       {
        return Doc.InputInternal(attr,_var,{
         $:0
        });
       },
       InputArea:function(attr,_var)
       {
        return Doc.InputInternal(attr,_var,{
         $:2
        });
       },
       InputInternal:function(attr,_var,inputTy)
       {
        var patternInput,attrN,el,valAttr;
        patternInput=inputTy.$==1?[Attr.Append(Attr.Create("type","password"),Attr.Concat(attr)),"input"]:inputTy.$==2?[Attr.Concat(attr),"textarea"]:[Attr.Concat(attr),"input"];
        attrN=patternInput[0];
        el=DomUtility.CreateElement(patternInput[1]);
        valAttr=Attr.DynamicCustom(function(el1)
        {
         return function(v)
         {
          el1.value=v;
         };
        },View1.FromVar(_var));
        el.addEventListener("input",function()
        {
         return Var.Set(_var,el.value);
        },false);
        return Doc.Elem(el,Attr.Append(attrN,valAttr),Doc.get_Empty());
       },
       Link:function(caption,attrs,action)
       {
        var arg10,attrs1;
        arg10=Attr.Concat(attrs);
        attrs1=Attr.Append(Attr.Create("href","#"),arg10);
        return Doc.Elem(Doc.Clickable("a",action),attrs1,Doc.TextNode(caption));
       },
       PasswordBox:function(attr,_var)
       {
        return Doc.InputInternal(attr,_var,{
         $:1
        });
       },
       Run:function(parent,doc)
       {
        var d,st,arg10;
        d=doc.DocNode;
        Docs.LinkElement(parent,d);
        st=Docs.CreateRunState(parent,d);
        arg10=doc.Updates;
        return View.Sink(Mailbox.StartProcessor(function()
        {
         return Docs.PerformAnimatedUpdate(st,parent,d);
        }),arg10);
       },
       RunById:function(id,tr)
       {
        var matchValue;
        matchValue=DomUtility.Doc().getElementById(id);
        return Unchecked.Equals(matchValue,null)?Operators.FailWith("invalid id: "+id):Doc.Run(matchValue,tr);
       },
       Select:function(attrs,show,options,current)
       {
        var setSelectedItem,el1,x,selectedItemAttr,optionElements;
        setSelectedItem=function(el)
        {
         return function(item)
         {
          el.selectedIndex=Seq.findIndex(function(y)
          {
           return Unchecked.Equals(item,y);
          },options);
         };
        };
        el1=DomUtility.CreateElement("select");
        x=View1.FromVar(current);
        selectedItemAttr=Attr.DynamicCustom(setSelectedItem,x);
        el1.addEventListener("change",function()
        {
         return Var.Set(current,options.get_Item(el1.selectedIndex));
        },false);
        optionElements=Doc.Concat(List.mapi(function(i)
        {
         return function(o)
         {
          var t;
          t=Doc.TextNode(show(o));
          return Doc.Element("option",List.ofArray([Attr.Create("value",Global.String(i))]),List.ofArray([t]));
         };
        },options));
        return Doc.Elem(el1,Attr.Append(selectedItemAttr,Attr.Concat(attrs)),optionElements);
       },
       Static:function(el)
       {
        return Doc.Elem(el,Attr.get_Empty(),Doc.get_Empty());
       },
       SvgElement:function(name,attr,children)
       {
        var attr1,arg20;
        attr1=Attr.Concat(attr);
        arg20=Doc.Concat(children);
        return Doc.Elem(DomUtility.CreateSvgElement(name),attr1,arg20);
       },
       TextNode:function(v)
       {
        return Doc.TextView(View.Const(v));
       },
       TextView:function(txt)
       {
        var node,x;
        node=Docs.CreateTextNode();
        x=View1.Map(function(t)
        {
         return Docs.UpdateTextNode(node,t);
        },txt);
        return Docs.Mk({
         $:4,
         $0:node
        },x);
       },
       get_Empty:function()
       {
        return Docs.Mk({
         $:3
        },View.Const(null));
       }
      }),
      DocElemNode:Runtime.Class({
       Equals:function(o)
       {
        return this.ElKey===o.ElKey;
       },
       GetHashCode:function()
       {
        return this.ElKey;
       }
      }),
      Docs:{
       ComputeChangeAnim:function(st,cur)
       {
        var arg00,relevant;
        arg00=function(n)
        {
         return Attrs.HasChangeAnim(n.Attr);
        };
        relevant=function(arg10)
        {
         return NodeSet.Filter(arg00,arg10);
        };
        return An.Concat(Arrays.map(function(n)
        {
         return Attrs.GetChangeAnim(n.Attr);
        },NodeSet.ToArray(NodeSet.Intersect(relevant(st.PreviousNodes),relevant(cur)))));
       },
       ComputeEnterAnim:function(st,cur)
       {
        return An.Concat(Arrays.map(function(n)
        {
         return Attrs.GetEnterAnim(n.Attr);
        },NodeSet.ToArray(NodeSet.Except(st.PreviousNodes,NodeSet.Filter(function(n)
        {
         return Attrs.HasEnterAnim(n.Attr);
        },cur)))));
       },
       ComputeExitAnim:function(st,cur)
       {
        return An.Concat(Arrays.map(function(n)
        {
         return Attrs.GetExitAnim(n.Attr);
        },NodeSet.ToArray(NodeSet.Except(cur,NodeSet.Filter(function(n)
        {
         return Attrs.HasExitAnim(n.Attr);
        },st.PreviousNodes)))));
       },
       CreateElemNode:function(el,attr,children)
       {
        Docs.LinkElement(el,children);
        return Runtime.New(DocElemNode,{
         Attr:Attrs.Insert(el,attr),
         Children:children,
         El:el,
         ElKey:Fresh.Int()
        });
       },
       CreateEmbedNode:function()
       {
        return{
         Current:{
          $:3
         },
         Dirty:false
        };
       },
       CreateRunState:function(parent,doc)
       {
        return{
         PreviousNodes:NodeSet.get_Empty(),
         Top:Docs.CreateElemNode(parent,Attr.get_Empty(),doc)
        };
       },
       CreateTextNode:function()
       {
        return{
         Text:DomUtility.CreateText(""),
         Dirty:false,
         Value:""
        };
       },
       DoSyncElement:function(el)
       {
        var parent,ins,parent1;
        parent=el.El;
        ins=function(doc,pos)
        {
         var d;
         if(doc.$==1)
          {
           return{
            $:1,
            $0:doc.$0.El
           };
          }
         else
          {
           if(doc.$==2)
            {
             d=doc.$0;
             if(d.Dirty)
              {
               d.Dirty=false;
               return Docs.InsertDoc(parent,d.Current,pos);
              }
             else
              {
               return ins(d.Current,pos);
              }
            }
           else
            {
             return doc.$==3?pos:doc.$==4?{
              $:1,
              $0:doc.$0.Text
             }:ins(doc.$0,ins(doc.$1,pos));
            }
          }
        };
        parent1=el.El;
        DomNodes.Iter(function(el1)
        {
         return DomUtility.RemoveNode(parent1,el1);
        },DomNodes.Except(DomNodes.DocChildren(el),DomNodes.Children(el.El)));
        ins(el.Children,{
         $:0
        });
        return;
       },
       DomNodes:Runtime.Class({},{
        Children:function(elem)
        {
         var objectArg;
         objectArg=elem.childNodes;
         return Runtime.New(DomNodes,{
          $:0,
          $0:Arrays.init(elem.childNodes.length,function(arg00)
          {
           return objectArg[arg00];
          })
         });
        },
        DocChildren:function(node)
        {
         var q,loop;
         q=[];
         loop=function(doc)
         {
          var b;
          if(doc.$==2)
           {
            return loop(doc.$0.Current);
           }
          else
           {
            if(doc.$==1)
             {
              return JQueue.Add(doc.$0.El,q);
             }
            else
             {
              if(doc.$==3)
               {
                return null;
               }
              else
               {
                if(doc.$==4)
                 {
                  return JQueue.Add(doc.$0.Text,q);
                 }
                else
                 {
                  b=doc.$1;
                  loop(doc.$0);
                  return loop(b);
                 }
               }
             }
           }
         };
         loop(node.Children);
         return Runtime.New(DomNodes,{
          $:0,
          $0:JQueue.ToArray(q)
         });
        },
        Except:function(_arg2,_arg1)
        {
         var excluded;
         excluded=_arg2.$0;
         return Runtime.New(DomNodes,{
          $:0,
          $0:Arrays.filter(function(n)
          {
           return Seq.forall(function(k)
           {
            return!(n===k);
           },excluded);
          },_arg1.$0)
         });
        },
        FoldBack:function(f,_arg4,z)
        {
         return Arrays.foldBack(f,_arg4.$0,z);
        },
        Iter:function(f,_arg3)
        {
         return Arrays.iter(f,_arg3.$0);
        }
       }),
       InsertDoc:function(parent,doc,pos)
       {
        var d;
        if(doc.$==1)
         {
          return Docs.InsertNode(parent,doc.$0.El,pos);
         }
        else
         {
          if(doc.$==2)
           {
            d=doc.$0;
            d.Dirty=false;
            return Docs.InsertDoc(parent,d.Current,pos);
           }
          else
           {
            return doc.$==3?pos:doc.$==4?Docs.InsertNode(parent,doc.$0.Text,pos):Docs.InsertDoc(parent,doc.$0,Docs.InsertDoc(parent,doc.$1,pos));
           }
         }
       },
       InsertNode:function(parent,node,pos)
       {
        DomUtility.InsertAt(parent,pos,node);
        return{
         $:1,
         $0:node
        };
       },
       LinkElement:function(el,children)
       {
        Docs.InsertDoc(el,children,{
         $:0
        });
       },
       Mk:function(node,updates)
       {
        return Runtime.New(Doc,{
         DocNode:node,
         Updates:updates
        });
       },
       NodeSet:Runtime.Class({},{
        Except:function(_arg3,_arg2)
        {
         return Runtime.New(NodeSet,{
          $:0,
          $0:HashSet2.Except(_arg3.$0,_arg2.$0)
         });
        },
        Filter:function(f,_arg1)
        {
         return Runtime.New(NodeSet,{
          $:0,
          $0:HashSet2.Filter(f,_arg1.$0)
         });
        },
        FindAll:function(doc)
        {
         var q,loop;
         q=[];
         loop=function(node)
         {
          var b,el;
          if(node.$==0)
           {
            b=node.$1;
            loop(node.$0);
            return loop(b);
           }
          else
           {
            if(node.$==1)
             {
              el=node.$0;
              JQueue.Add(el,q);
              return loop(el.Children);
             }
            else
             {
              return node.$==2?loop(node.$0.Current):null;
             }
           }
         };
         loop(doc);
         return Runtime.New(NodeSet,{
          $:0,
          $0:HashSet1.New11(JQueue.ToArray(q))
         });
        },
        Intersect:function(_arg5,_arg4)
        {
         return Runtime.New(NodeSet,{
          $:0,
          $0:HashSet2.Intersect(_arg5.$0,_arg4.$0)
         });
        },
        IsEmpty:function(_arg6)
        {
         return _arg6.$0.get_Count()===0;
        },
        ToArray:function(_arg7)
        {
         return HashSet2.ToArray(_arg7.$0);
        },
        get_Empty:function()
        {
         return Runtime.New(NodeSet,{
          $:0,
          $0:HashSet1.New2()
         });
        }
       }),
       PerformAnimatedUpdate:function(st,parent,doc)
       {
        return Concurrency.Delay(function()
        {
         var cur,change,enter;
         cur=NodeSet.FindAll(doc);
         change=Docs.ComputeChangeAnim(st,cur);
         enter=Docs.ComputeEnterAnim(st,cur);
         return Concurrency.Bind(An.Play(An.Append(change,Docs.ComputeExitAnim(st,cur))),function()
         {
          Docs.SyncElemNode(st.Top);
          return Concurrency.Bind(An.Play(enter),function()
          {
           return Concurrency.Return(void(st.PreviousNodes=cur));
          });
         });
        });
       },
       Sync:function(doc)
       {
        var sync;
        sync=function(doc1)
        {
         var el,d,b;
         if(doc1.$==1)
          {
           el=doc1.$0;
           Docs.SyncElement(el);
           return sync(el.Children);
          }
         else
          {
           if(doc1.$==2)
            {
             return sync(doc1.$0.Current);
            }
           else
            {
             if(doc1.$==3)
              {
               return null;
              }
             else
              {
               if(doc1.$==4)
                {
                 d=doc1.$0;
                 if(d.Dirty)
                  {
                   d.Text.nodeValue=d.Value;
                   d.Dirty=false;
                   return;
                  }
                 else
                  {
                   return null;
                  }
                }
               else
                {
                 b=doc1.$1;
                 sync(doc1.$0);
                 return sync(b);
                }
              }
            }
          }
        };
        return sync(doc);
       },
       SyncElemNode:function(el)
       {
        Docs.SyncElement(el);
        return Docs.Sync(el.Children);
       },
       SyncElement:function(el)
       {
        var dirty;
        Attrs.Sync(el.El,el.Attr);
        dirty=function(doc)
        {
         var b,d;
         if(doc.$==0)
          {
           b=doc.$1;
           return dirty(doc.$0)?true:dirty(b);
          }
         else
          {
           if(doc.$==2)
            {
             d=doc.$0;
             return d.Dirty?true:dirty(d.Current);
            }
           else
            {
             return false;
            }
          }
        };
        return dirty(el.Children)?Docs.DoSyncElement(el):null;
       },
       UpdateEmbedNode:function(node,upd)
       {
        node.Current=upd;
        node.Dirty=true;
        return;
       },
       UpdateTextNode:function(n,t)
       {
        n.Value=t;
        n.Dirty=true;
        return;
       }
      },
      DomUtility:{
       AddClass:function(element,cl)
       {
        jQuery(element).addClass(cl);
       },
       AppendTo:function(ctx,node)
       {
        ctx.appendChild(node);
       },
       Clear:function(ctx)
       {
        while(ctx.hasChildNodes())
         {
          ctx.removeChild(ctx.firstChild);
         }
        return;
       },
       ClearAttrs:function(ctx)
       {
        while(ctx.hasAttributes())
         {
          ctx.removeAttributeNode(ctx.attributes.item(0));
         }
        return;
       },
       CreateAttr:function(name,value)
       {
        var a;
        a=DomUtility.Doc().createAttribute(name);
        a.value=value;
        return a;
       },
       CreateElement:function(name)
       {
        return DomUtility.Doc().createElement(name);
       },
       CreateSvgElement:function(name)
       {
        return DomUtility.Doc().createElementNS("http://www.w3.org/2000/svg",name);
       },
       CreateText:function(s)
       {
        return DomUtility.Doc().createTextNode(s);
       },
       Doc:Runtime.Field(function()
       {
        return document;
       }),
       InsertAt:function(parent,pos,node)
       {
        var _,matchValue,matchValue1;
        if(node.parentNode===parent)
         {
          matchValue=node.nextSibling;
          matchValue1=[pos,Unchecked.Equals(matchValue,null)?{
           $:0
          }:{
           $:1,
           $0:matchValue
          }];
          _=matchValue1[0].$==1?matchValue1[1].$==1?matchValue1[0].$0===matchValue1[1].$0:false:matchValue1[1].$==0?true:false;
         }
        else
         {
          _=false;
         }
        return!_?pos.$==1?void parent.insertBefore(node,pos.$0):void parent.appendChild(node):null;
       },
       RemoveClass:function(element,cl)
       {
        jQuery(element).removeClass(cl);
       },
       RemoveNode:function(parent,el)
       {
        return el.parentNode===parent?void parent.removeChild(el):null;
       },
       SetAttr:function(el,name,value)
       {
        return el.setAttribute(name,value);
       },
       SetProperty:function($target,$name,$value)
       {
        var $0=this,$this=this;
        return $target.setProperty($name,$value);
       },
       SetStyle:function(el,name,value)
       {
        return DomUtility.SetProperty(el.style,name,value);
       }
      },
      DoubleInterpolation:Runtime.Class({
       Interpolate:function(t,x,y)
       {
        return x+t*(y-x);
       }
      }),
      DynamicAttrNode:Runtime.Class({
       GetChangeAnim:function()
       {
        return An.get_Empty();
       },
       GetEnterAnim:function()
       {
        return An.get_Empty();
       },
       GetExitAnim:function()
       {
        return An.get_Empty();
       },
       Sync:function(parent)
       {
        if(this.dirty)
         {
          (this.push.call(null,parent))(this.value);
          this.dirty=false;
          return;
         }
        else
         {
          return null;
         }
       },
       get_Changed:function()
       {
        return this.updates;
       }
      },{
       New:function(view,push)
       {
        var r;
        r=Runtime.New(this,{});
        r.push=push;
        r.value=Abbrev.U();
        r.dirty=true;
        r.updates=View1.Map(function(x)
        {
         r.value=x;
         r.dirty=true;
         return;
        },view);
        return r;
       }
      }),
      Easing:Runtime.Class({},{
       Custom:function(f)
       {
        return Runtime.New(Easing,{
         TransformTime:f
        });
       },
       get_CubicInOut:function()
       {
        return Easings.CubicInOut();
       }
      }),
      Easings:{
       CubicInOut:Runtime.Field(function()
       {
        return Runtime.New(Easing,{
         TransformTime:function(t)
         {
          var t2;
          t2=t*t;
          return 3*t2-2*(t2*t);
         }
        });
       })
      },
      Flow:Runtime.Class({},{
       Bind:function(m,k)
       {
        return{
         Render:function(_var)
         {
          return function(cont)
          {
           return(m.Render.call(null,_var))(function(r)
           {
            return(k(r).Render.call(null,_var))(cont);
           });
          };
         }
        };
       },
       Define:function(f)
       {
        return{
         Render:function(_var)
         {
          return function(cont)
          {
           return Var.Set(_var,f(cont));
          };
         }
        };
       },
       Embed:function(fl)
       {
        var _var;
        _var=Var1.Create(Doc.get_Empty());
        (fl.Render.call(null,_var))(function()
        {
        });
        return Doc.EmbedView(_var.get_View());
       },
       Map:function(f,x)
       {
        return{
         Render:function(_var)
         {
          return function(cont)
          {
           return(x.Render.call(null,_var))(function(r)
           {
            return cont(f(r));
           });
          };
         }
        };
       },
       Return:function(x)
       {
        return{
         Render:function()
         {
          return function(cont)
          {
           return cont(x);
          };
         }
        };
       },
       Static:function(doc)
       {
        return{
         Render:function(_var)
         {
          return function(cont)
          {
           Var.Set(_var,doc);
           return cont(null);
          };
         }
        };
       },
       get_Do:function()
       {
        return FlowBuilder.New();
       }
      }),
      FlowBuilder:Runtime.Class({
       Bind:function(comp,func)
       {
        return Flow.Bind(comp,func);
       },
       Return:function(value)
       {
        return Flow.Return(value);
       },
       ReturnFrom:function(inner)
       {
        return inner;
       }
      },{
       New:function()
       {
        return Runtime.New(this,{});
       }
      }),
      Html:{
       A:function(atr,ch)
       {
        return Elements.A(atr,ch);
       },
       A0:function(ch)
       {
        return Elements.A(Runtime.New(T,{
         $:0
        }),ch);
       },
       Attributes:{
        Accept:Runtime.Field(function()
        {
         return"accept";
        }),
        AcceptCharset:Runtime.Field(function()
        {
         return"accept-charset";
        }),
        Accesskey:Runtime.Field(function()
        {
         return"accesskey";
        }),
        Action:Runtime.Field(function()
        {
         return"action";
        }),
        Align:Runtime.Field(function()
        {
         return"align";
        }),
        Alt:Runtime.Field(function()
        {
         return"alt";
        }),
        Async:Runtime.Field(function()
        {
         return"async";
        }),
        AutoComplete:Runtime.Field(function()
        {
         return"autocomplete";
        }),
        AutoFocus:Runtime.Field(function()
        {
         return"autofocus";
        }),
        AutoPlay:Runtime.Field(function()
        {
         return"autoplay";
        }),
        AutoSave:Runtime.Field(function()
        {
         return"autosave";
        }),
        BgColor:Runtime.Field(function()
        {
         return"bgcolor";
        }),
        Border:Runtime.Field(function()
        {
         return"border";
        }),
        Buffered:Runtime.Field(function()
        {
         return"buffered";
        }),
        Challenge:Runtime.Field(function()
        {
         return"challenge";
        }),
        Charset:Runtime.Field(function()
        {
         return"charset";
        }),
        Checked:Runtime.Field(function()
        {
         return"checked";
        }),
        Cite:Runtime.Field(function()
        {
         return"cite";
        }),
        Class:Runtime.Field(function()
        {
         return"class";
        }),
        Code:Runtime.Field(function()
        {
         return"code";
        }),
        Codebase:Runtime.Field(function()
        {
         return"codebase";
        }),
        ColSpan:Runtime.Field(function()
        {
         return"colspan";
        }),
        Color:Runtime.Field(function()
        {
         return"color";
        }),
        Cols:Runtime.Field(function()
        {
         return"cols";
        }),
        Content:Runtime.Field(function()
        {
         return"content";
        }),
        ContentEditable:Runtime.Field(function()
        {
         return"contenteditable";
        }),
        ContextMenu:Runtime.Field(function()
        {
         return"contextmenu";
        }),
        Controls:Runtime.Field(function()
        {
         return"controls";
        }),
        Coords:Runtime.Field(function()
        {
         return"coords";
        }),
        Datetime:Runtime.Field(function()
        {
         return"datetime";
        }),
        Default:Runtime.Field(function()
        {
         return"default";
        }),
        Defer:Runtime.Field(function()
        {
         return"defer";
        }),
        Dir:Runtime.Field(function()
        {
         return"dir";
        }),
        DirName:Runtime.Field(function()
        {
         return"dirname";
        }),
        Disabled:Runtime.Field(function()
        {
         return"disabled";
        }),
        Download:Runtime.Field(function()
        {
         return"download";
        }),
        Draggable:Runtime.Field(function()
        {
         return"draggable";
        }),
        Dropzone:Runtime.Field(function()
        {
         return"dropzone";
        }),
        EncType:Runtime.Field(function()
        {
         return"enctype";
        }),
        For:Runtime.Field(function()
        {
         return"for";
        }),
        Form:Runtime.Field(function()
        {
         return"form";
        }),
        FormAction:Runtime.Field(function()
        {
         return"formaction";
        }),
        Headers:Runtime.Field(function()
        {
         return"headers";
        }),
        Height:Runtime.Field(function()
        {
         return"height";
        }),
        Hidden:Runtime.Field(function()
        {
         return"hidden";
        }),
        High:Runtime.Field(function()
        {
         return"high";
        }),
        Href:Runtime.Field(function()
        {
         return"href";
        }),
        HrefLang:Runtime.Field(function()
        {
         return"hreflang";
        }),
        HttpEquiv:Runtime.Field(function()
        {
         return"http-equiv";
        }),
        ID:Runtime.Field(function()
        {
         return"id";
        }),
        Icon:Runtime.Field(function()
        {
         return"icon";
        }),
        IsMap:Runtime.Field(function()
        {
         return"ismap";
        }),
        ItemProp:Runtime.Field(function()
        {
         return"itemprop";
        }),
        KeyType:Runtime.Field(function()
        {
         return"keytype";
        }),
        Kind:Runtime.Field(function()
        {
         return"kind";
        }),
        Label:Runtime.Field(function()
        {
         return"label";
        }),
        Lang:Runtime.Field(function()
        {
         return"lang";
        }),
        Language:Runtime.Field(function()
        {
         return"language";
        }),
        List:Runtime.Field(function()
        {
         return"list";
        }),
        Loop:Runtime.Field(function()
        {
         return"loop";
        }),
        Low:Runtime.Field(function()
        {
         return"low";
        }),
        Manifest:Runtime.Field(function()
        {
         return"manifest";
        }),
        Max:Runtime.Field(function()
        {
         return"max";
        }),
        MaxLength:Runtime.Field(function()
        {
         return"maxlength";
        }),
        Media:Runtime.Field(function()
        {
         return"media";
        }),
        Method:Runtime.Field(function()
        {
         return"method";
        }),
        Min:Runtime.Field(function()
        {
         return"min";
        }),
        Multiple:Runtime.Field(function()
        {
         return"multiple";
        }),
        Name:Runtime.Field(function()
        {
         return"name";
        }),
        NoValidate:Runtime.Field(function()
        {
         return"novalidate";
        }),
        Open:Runtime.Field(function()
        {
         return"open";
        }),
        Optimum:Runtime.Field(function()
        {
         return"optimum";
        }),
        Pattern:Runtime.Field(function()
        {
         return"pattern";
        }),
        Ping:Runtime.Field(function()
        {
         return"ping";
        }),
        Placeholder:Runtime.Field(function()
        {
         return"placeholder";
        }),
        Poster:Runtime.Field(function()
        {
         return"poster";
        }),
        Preload:Runtime.Field(function()
        {
         return"preload";
        }),
        PubDate:Runtime.Field(function()
        {
         return"pubdate";
        }),
        RadioGroup:Runtime.Field(function()
        {
         return"radiogroup";
        }),
        Readonly:Runtime.Field(function()
        {
         return"readonly";
        }),
        Rel:Runtime.Field(function()
        {
         return"rel";
        }),
        Required:Runtime.Field(function()
        {
         return"required";
        }),
        Reversed:Runtime.Field(function()
        {
         return"reversed";
        }),
        RowSpan:Runtime.Field(function()
        {
         return"rowspan";
        }),
        Rows:Runtime.Field(function()
        {
         return"rows";
        }),
        Sandbox:Runtime.Field(function()
        {
         return"sandbox";
        }),
        Scope:Runtime.Field(function()
        {
         return"scope";
        }),
        Scoped:Runtime.Field(function()
        {
         return"scoped";
        }),
        Seamless:Runtime.Field(function()
        {
         return"seamless";
        }),
        Selected:Runtime.Field(function()
        {
         return"selected";
        }),
        Shape:Runtime.Field(function()
        {
         return"shape";
        }),
        Size:Runtime.Field(function()
        {
         return"size";
        }),
        Sizes:Runtime.Field(function()
        {
         return"sizes";
        }),
        Span:Runtime.Field(function()
        {
         return"span";
        }),
        Spellcheck:Runtime.Field(function()
        {
         return"spellcheck";
        }),
        Src:Runtime.Field(function()
        {
         return"src";
        }),
        SrcLang:Runtime.Field(function()
        {
         return"srclang";
        }),
        Srcdoc:Runtime.Field(function()
        {
         return"srcdoc";
        }),
        Start:Runtime.Field(function()
        {
         return"start";
        }),
        Step:Runtime.Field(function()
        {
         return"step";
        }),
        Style:Runtime.Field(function()
        {
         return"style";
        }),
        Summary:Runtime.Field(function()
        {
         return"summary";
        }),
        TabIndex:Runtime.Field(function()
        {
         return"tabindex";
        }),
        Target:Runtime.Field(function()
        {
         return"target";
        }),
        Title:Runtime.Field(function()
        {
         return"title";
        }),
        Type:Runtime.Field(function()
        {
         return"type";
        }),
        Usemap:Runtime.Field(function()
        {
         return"usemap";
        }),
        Value:Runtime.Field(function()
        {
         return"value";
        }),
        Width:Runtime.Field(function()
        {
         return"width";
        }),
        Wrap:Runtime.Field(function()
        {
         return"wrap";
        })
       },
       Del:function(atr,ch)
       {
        return Elements.Del(atr,ch);
       },
       Del0:function(ch)
       {
        return Elements.Del(Runtime.New(T,{
         $:0
        }),ch);
       },
       Div:function(atr,ch)
       {
        return Elements.Div(atr,ch);
       },
       Div0:function(ch)
       {
        return Elements.Div(Runtime.New(T,{
         $:0
        }),ch);
       },
       Elements:{
        A:function(ats,ch)
        {
         return Doc.Element("a",ats,ch);
        },
        Abbr:function(ats,ch)
        {
         return Doc.Element("abbr",ats,ch);
        },
        Address:function(ats,ch)
        {
         return Doc.Element("address",ats,ch);
        },
        Area:function(ats,ch)
        {
         return Doc.Element("area",ats,ch);
        },
        Article:function(ats,ch)
        {
         return Doc.Element("article",ats,ch);
        },
        Aside:function(ats,ch)
        {
         return Doc.Element("aside",ats,ch);
        },
        Audio:function(ats,ch)
        {
         return Doc.Element("audio",ats,ch);
        },
        B:function(ats,ch)
        {
         return Doc.Element("b",ats,ch);
        },
        BDI:function(ats,ch)
        {
         return Doc.Element("bdi",ats,ch);
        },
        BDO:function(ats,ch)
        {
         return Doc.Element("bdo",ats,ch);
        },
        Base:function(ats,ch)
        {
         return Doc.Element("base",ats,ch);
        },
        BlockQuote:function(ats,ch)
        {
         return Doc.Element("blockquote",ats,ch);
        },
        Body:function(ats,ch)
        {
         return Doc.Element("body",ats,ch);
        },
        Br:function(ats,ch)
        {
         return Doc.Element("br",ats,ch);
        },
        Button:function(ats,ch)
        {
         return Doc.Element("button",ats,ch);
        },
        Canvas:function(ats,ch)
        {
         return Doc.Element("canvas",ats,ch);
        },
        Caption:function(ats,ch)
        {
         return Doc.Element("caption",ats,ch);
        },
        Cite:function(ats,ch)
        {
         return Doc.Element("cite",ats,ch);
        },
        Code:function(ats,ch)
        {
         return Doc.Element("code",ats,ch);
        },
        Col:function(ats,ch)
        {
         return Doc.Element("col",ats,ch);
        },
        ColGroup:function(ats,ch)
        {
         return Doc.Element("colgroup",ats,ch);
        },
        DD:function(ats,ch)
        {
         return Doc.Element("dd",ats,ch);
        },
        DFN:function(ats,ch)
        {
         return Doc.Element("dfn",ats,ch);
        },
        DL:function(ats,ch)
        {
         return Doc.Element("dl",ats,ch);
        },
        DT:function(ats,ch)
        {
         return Doc.Element("dt",ats,ch);
        },
        Data:function(ats,ch)
        {
         return Doc.Element("data",ats,ch);
        },
        DataList:function(ats,ch)
        {
         return Doc.Element("datalist",ats,ch);
        },
        Del:function(ats,ch)
        {
         return Doc.Element("del",ats,ch);
        },
        Details:function(ats,ch)
        {
         return Doc.Element("details",ats,ch);
        },
        Div:function(ats,ch)
        {
         return Doc.Element("div",ats,ch);
        },
        Em:function(ats,ch)
        {
         return Doc.Element("em",ats,ch);
        },
        Embed:function(ats,ch)
        {
         return Doc.Element("embed",ats,ch);
        },
        FieldSet:function(ats,ch)
        {
         return Doc.Element("fieldset",ats,ch);
        },
        FigCaption:function(ats,ch)
        {
         return Doc.Element("figcaption",ats,ch);
        },
        Figure:function(ats,ch)
        {
         return Doc.Element("figure",ats,ch);
        },
        Footer:function(ats,ch)
        {
         return Doc.Element("footer",ats,ch);
        },
        Form:function(ats,ch)
        {
         return Doc.Element("form",ats,ch);
        },
        H1:function(ats,ch)
        {
         return Doc.Element("h1",ats,ch);
        },
        H2:function(ats,ch)
        {
         return Doc.Element("h2",ats,ch);
        },
        H3:function(ats,ch)
        {
         return Doc.Element("h3",ats,ch);
        },
        H4:function(ats,ch)
        {
         return Doc.Element("h4",ats,ch);
        },
        H5:function(ats,ch)
        {
         return Doc.Element("h5",ats,ch);
        },
        H6:function(ats,ch)
        {
         return Doc.Element("h6",ats,ch);
        },
        HR:function(ats,ch)
        {
         return Doc.Element("hr",ats,ch);
        },
        Head:function(ats,ch)
        {
         return Doc.Element("head",ats,ch);
        },
        Header:function(ats,ch)
        {
         return Doc.Element("header",ats,ch);
        },
        Html:function(ats,ch)
        {
         return Doc.Element("html",ats,ch);
        },
        I:function(ats,ch)
        {
         return Doc.Element("i",ats,ch);
        },
        IFrame:function(ats,ch)
        {
         return Doc.Element("iframe",ats,ch);
        },
        Img:function(ats,ch)
        {
         return Doc.Element("img",ats,ch);
        },
        Input:function(ats,ch)
        {
         return Doc.Element("input",ats,ch);
        },
        Ins:function(ats,ch)
        {
         return Doc.Element("ins",ats,ch);
        },
        Kbd:function(ats,ch)
        {
         return Doc.Element("kbd",ats,ch);
        },
        Keygen:function(ats,ch)
        {
         return Doc.Element("keygen",ats,ch);
        },
        LI:function(ats,ch)
        {
         return Doc.Element("li",ats,ch);
        },
        Label:function(ats,ch)
        {
         return Doc.Element("label",ats,ch);
        },
        Legend:function(ats,ch)
        {
         return Doc.Element("legend",ats,ch);
        },
        Link:function(ats,ch)
        {
         return Doc.Element("link",ats,ch);
        },
        Main:function(ats,ch)
        {
         return Doc.Element("main",ats,ch);
        },
        Map:function(ats,ch)
        {
         return Doc.Element("map",ats,ch);
        },
        Mark:function(ats,ch)
        {
         return Doc.Element("mark",ats,ch);
        },
        Menu:function(ats,ch)
        {
         return Doc.Element("menu",ats,ch);
        },
        MenuItem:function(ats,ch)
        {
         return Doc.Element("menuitem",ats,ch);
        },
        Meta:function(ats,ch)
        {
         return Doc.Element("meta",ats,ch);
        },
        Meter:function(ats,ch)
        {
         return Doc.Element("meter",ats,ch);
        },
        Nav:function(ats,ch)
        {
         return Doc.Element("nav",ats,ch);
        },
        NoScript:function(ats,ch)
        {
         return Doc.Element("noscript",ats,ch);
        },
        OL:function(ats,ch)
        {
         return Doc.Element("ol",ats,ch);
        },
        Object:function(ats,ch)
        {
         return Doc.Element("object",ats,ch);
        },
        OptGroup:function(ats,ch)
        {
         return Doc.Element("optgroup",ats,ch);
        },
        Option:function(ats,ch)
        {
         return Doc.Element("option",ats,ch);
        },
        Output:function(ats,ch)
        {
         return Doc.Element("output",ats,ch);
        },
        P:function(ats,ch)
        {
         return Doc.Element("p",ats,ch);
        },
        Param:function(ats,ch)
        {
         return Doc.Element("param",ats,ch);
        },
        Picture:function(ats,ch)
        {
         return Doc.Element("picture",ats,ch);
        },
        Pre:function(ats,ch)
        {
         return Doc.Element("pre",ats,ch);
        },
        Progress:function(ats,ch)
        {
         return Doc.Element("progress",ats,ch);
        },
        Q:function(ats,ch)
        {
         return Doc.Element("q",ats,ch);
        },
        RP:function(ats,ch)
        {
         return Doc.Element("rp",ats,ch);
        },
        RT:function(ats,ch)
        {
         return Doc.Element("rt",ats,ch);
        },
        Ruby:function(ats,ch)
        {
         return Doc.Element("ruby",ats,ch);
        },
        S:function(ats,ch)
        {
         return Doc.Element("s",ats,ch);
        },
        Samp:function(ats,ch)
        {
         return Doc.Element("samp",ats,ch);
        },
        Script:function(ats,ch)
        {
         return Doc.Element("script",ats,ch);
        },
        Section:function(ats,ch)
        {
         return Doc.Element("section",ats,ch);
        },
        Select:function(ats,ch)
        {
         return Doc.Element("select",ats,ch);
        },
        Small:function(ats,ch)
        {
         return Doc.Element("small",ats,ch);
        },
        Source:function(ats,ch)
        {
         return Doc.Element("source",ats,ch);
        },
        Span:function(ats,ch)
        {
         return Doc.Element("span",ats,ch);
        },
        Strong:function(ats,ch)
        {
         return Doc.Element("strong",ats,ch);
        },
        Style:function(ats,ch)
        {
         return Doc.Element("style",ats,ch);
        },
        Sub:function(ats,ch)
        {
         return Doc.Element("sub",ats,ch);
        },
        Summary:function(ats,ch)
        {
         return Doc.Element("summary",ats,ch);
        },
        Sup:function(ats,ch)
        {
         return Doc.Element("sup",ats,ch);
        },
        TBody:function(ats,ch)
        {
         return Doc.Element("tbody",ats,ch);
        },
        TD:function(ats,ch)
        {
         return Doc.Element("td",ats,ch);
        },
        TFoot:function(ats,ch)
        {
         return Doc.Element("tfoot",ats,ch);
        },
        TH:function(ats,ch)
        {
         return Doc.Element("th",ats,ch);
        },
        THead:function(ats,ch)
        {
         return Doc.Element("thead",ats,ch);
        },
        TR:function(ats,ch)
        {
         return Doc.Element("tr",ats,ch);
        },
        Table:function(ats,ch)
        {
         return Doc.Element("table",ats,ch);
        },
        TextArea:function(ats,ch)
        {
         return Doc.Element("textarea",ats,ch);
        },
        Time:function(ats,ch)
        {
         return Doc.Element("time",ats,ch);
        },
        Title:function(ats,ch)
        {
         return Doc.Element("title",ats,ch);
        },
        Track:function(ats,ch)
        {
         return Doc.Element("track",ats,ch);
        },
        U:function(ats,ch)
        {
         return Doc.Element("u",ats,ch);
        },
        UL:function(ats,ch)
        {
         return Doc.Element("ul",ats,ch);
        },
        Var:function(ats,ch)
        {
         return Doc.Element("var",ats,ch);
        },
        Video:function(ats,ch)
        {
         return Doc.Element("video",ats,ch);
        },
        WBR:function(ats,ch)
        {
         return Doc.Element("wbr",ats,ch);
        }
       },
       Form:function(atr,ch)
       {
        return Elements.Form(atr,ch);
       },
       Form0:function(ch)
       {
        return Elements.Form(Runtime.New(T,{
         $:0
        }),ch);
       },
       H1:function(atr,ch)
       {
        return Elements.H1(atr,ch);
       },
       H10:function(ch)
       {
        return Elements.H1(Runtime.New(T,{
         $:0
        }),ch);
       },
       H2:function(atr,ch)
       {
        return Elements.H2(atr,ch);
       },
       H20:function(ch)
       {
        return Elements.H2(Runtime.New(T,{
         $:0
        }),ch);
       },
       H3:function(atr,ch)
       {
        return Elements.H3(atr,ch);
       },
       H30:function(ch)
       {
        return Elements.H3(Runtime.New(T,{
         $:0
        }),ch);
       },
       H4:function(atr,ch)
       {
        return Elements.H4(atr,ch);
       },
       H40:function(ch)
       {
        return Elements.H4(Runtime.New(T,{
         $:0
        }),ch);
       },
       H5:function(atr,ch)
       {
        return Elements.H5(atr,ch);
       },
       H50:function(ch)
       {
        return Elements.H5(Runtime.New(T,{
         $:0
        }),ch);
       },
       H6:function(atr,ch)
       {
        return Elements.H6(atr,ch);
       },
       H60:function(ch)
       {
        return Elements.H6(Runtime.New(T,{
         $:0
        }),ch);
       },
       LI:function(atr,ch)
       {
        return Elements.LI(atr,ch);
       },
       LI0:function(ch)
       {
        return Elements.LI(Runtime.New(T,{
         $:0
        }),ch);
       },
       Label:function(atr,ch)
       {
        return Elements.Label(atr,ch);
       },
       Label0:function(ch)
       {
        return Elements.Label(Runtime.New(T,{
         $:0
        }),ch);
       },
       Nav:function(atr,ch)
       {
        return Elements.Nav(atr,ch);
       },
       Nav0:function(ch)
       {
        return Elements.Nav(Runtime.New(T,{
         $:0
        }),ch);
       },
       OL:function(atr,ch)
       {
        return Elements.OL(atr,ch);
       },
       OL0:function(ch)
       {
        return Elements.OL(Runtime.New(T,{
         $:0
        }),ch);
       },
       P:function(atr,ch)
       {
        return Elements.P(atr,ch);
       },
       P0:function(ch)
       {
        return Elements.P(Runtime.New(T,{
         $:0
        }),ch);
       },
       Span:function(atr,ch)
       {
        return Elements.Span(atr,ch);
       },
       Span0:function(ch)
       {
        return Elements.Span(Runtime.New(T,{
         $:0
        }),ch);
       },
       SvgAttributes:{
        AccentHeight:Runtime.Field(function()
        {
         return"accent-height";
        }),
        Accumulate:Runtime.Field(function()
        {
         return"accumulate";
        }),
        Additive:Runtime.Field(function()
        {
         return"additive";
        }),
        AlignmentBaseline:Runtime.Field(function()
        {
         return"alignment-baseline";
        }),
        Ascent:Runtime.Field(function()
        {
         return"ascent";
        }),
        AttributeName:Runtime.Field(function()
        {
         return"attributeName";
        }),
        AttributeType:Runtime.Field(function()
        {
         return"attributeType";
        }),
        Azimuth:Runtime.Field(function()
        {
         return"azimuth";
        }),
        BaseFrequency:Runtime.Field(function()
        {
         return"baseFrequency";
        }),
        BaselineShift:Runtime.Field(function()
        {
         return"baseline-shift";
        }),
        Begin:Runtime.Field(function()
        {
         return"begin";
        }),
        Bias:Runtime.Field(function()
        {
         return"bias";
        }),
        CX:Runtime.Field(function()
        {
         return"cx";
        }),
        CY:Runtime.Field(function()
        {
         return"cy";
        }),
        CalcMode:Runtime.Field(function()
        {
         return"calcMode";
        }),
        Class:Runtime.Field(function()
        {
         return"class";
        }),
        Clip:Runtime.Field(function()
        {
         return"clip";
        }),
        ClipPath:Runtime.Field(function()
        {
         return"clip-path";
        }),
        ClipPathUnits:Runtime.Field(function()
        {
         return"clipPathUnits";
        }),
        ClipRule:Runtime.Field(function()
        {
         return"clip-rule";
        }),
        Color:Runtime.Field(function()
        {
         return"color";
        }),
        ColorInterpolation:Runtime.Field(function()
        {
         return"color-interpolation";
        }),
        ColorInterpolationFilters:Runtime.Field(function()
        {
         return"color-interpolation-filters";
        }),
        ColorProfile:Runtime.Field(function()
        {
         return"color-profile";
        }),
        ColorRendering:Runtime.Field(function()
        {
         return"color-rendering";
        }),
        ContentScriptType:Runtime.Field(function()
        {
         return"contentScriptType";
        }),
        ContentStyleType:Runtime.Field(function()
        {
         return"contentStyleType";
        }),
        Cursor:Runtime.Field(function()
        {
         return"cursor";
        }),
        D:Runtime.Field(function()
        {
         return"d";
        }),
        DX:Runtime.Field(function()
        {
         return"dx";
        }),
        DY:Runtime.Field(function()
        {
         return"dy";
        }),
        DiffuseConstant:Runtime.Field(function()
        {
         return"diffuseConstant";
        }),
        Direction:Runtime.Field(function()
        {
         return"direction";
        }),
        Display:Runtime.Field(function()
        {
         return"display";
        }),
        Divisor:Runtime.Field(function()
        {
         return"divisor";
        }),
        DominantBaseline:Runtime.Field(function()
        {
         return"dominant-baseline";
        }),
        Dur:Runtime.Field(function()
        {
         return"dur";
        }),
        EdgeMode:Runtime.Field(function()
        {
         return"edgeMode";
        }),
        Elevation:Runtime.Field(function()
        {
         return"elevation";
        }),
        End:Runtime.Field(function()
        {
         return"end";
        }),
        ExternalResourcesRequired:Runtime.Field(function()
        {
         return"externalResourcesRequired";
        }),
        Fill:Runtime.Field(function()
        {
         return"fill";
        }),
        FillOpacity:Runtime.Field(function()
        {
         return"fill-opacity";
        }),
        FillRule:Runtime.Field(function()
        {
         return"fill-rule";
        }),
        Filter:Runtime.Field(function()
        {
         return"filter";
        }),
        FilterRes:Runtime.Field(function()
        {
         return"filterRes";
        }),
        FilterUnits:Runtime.Field(function()
        {
         return"filterUnits";
        }),
        FloodColor:Runtime.Field(function()
        {
         return"flood-color";
        }),
        FloodOpacity:Runtime.Field(function()
        {
         return"flood-opacity";
        }),
        FontFamily:Runtime.Field(function()
        {
         return"font-family";
        }),
        FontSize:Runtime.Field(function()
        {
         return"font-size";
        }),
        FontSizeAdjust:Runtime.Field(function()
        {
         return"font-size-adjust";
        }),
        FontStretch:Runtime.Field(function()
        {
         return"font-stretch";
        }),
        FontStyle:Runtime.Field(function()
        {
         return"font-style";
        }),
        FontVariant:Runtime.Field(function()
        {
         return"font-variant";
        }),
        FontWeight:Runtime.Field(function()
        {
         return"font-weight";
        }),
        From:Runtime.Field(function()
        {
         return"from";
        }),
        GradientTransform:Runtime.Field(function()
        {
         return"gradientTransform";
        }),
        GradientUnits:Runtime.Field(function()
        {
         return"gradientUnits";
        }),
        Height:Runtime.Field(function()
        {
         return"height";
        }),
        IN:Runtime.Field(function()
        {
         return"in";
        }),
        ImageRendering:Runtime.Field(function()
        {
         return"image-rendering";
        }),
        In2:Runtime.Field(function()
        {
         return"in2";
        }),
        K1:Runtime.Field(function()
        {
         return"k1";
        }),
        K2:Runtime.Field(function()
        {
         return"k2";
        }),
        K3:Runtime.Field(function()
        {
         return"k3";
        }),
        K4:Runtime.Field(function()
        {
         return"k4";
        }),
        KernelMatrix:Runtime.Field(function()
        {
         return"kernelMatrix";
        }),
        KernelUnitLength:Runtime.Field(function()
        {
         return"kernelUnitLength";
        }),
        Kerning:Runtime.Field(function()
        {
         return"kerning";
        }),
        KeySplines:Runtime.Field(function()
        {
         return"keySplines";
        }),
        KeyTimes:Runtime.Field(function()
        {
         return"keyTimes";
        }),
        LetterSpacing:Runtime.Field(function()
        {
         return"letter-spacing";
        }),
        LightingColor:Runtime.Field(function()
        {
         return"lighting-color";
        }),
        LimitingConeAngle:Runtime.Field(function()
        {
         return"limitingConeAngle";
        }),
        Local:Runtime.Field(function()
        {
         return"local";
        }),
        MarkerEnd:Runtime.Field(function()
        {
         return"marker-end";
        }),
        MarkerHeight:Runtime.Field(function()
        {
         return"markerHeight";
        }),
        MarkerMid:Runtime.Field(function()
        {
         return"marker-mid";
        }),
        MarkerStart:Runtime.Field(function()
        {
         return"marker-start";
        }),
        MarkerUnits:Runtime.Field(function()
        {
         return"markerUnits";
        }),
        MarkerWidth:Runtime.Field(function()
        {
         return"markerWidth";
        }),
        Mask:Runtime.Field(function()
        {
         return"mask";
        }),
        MaskContentUnits:Runtime.Field(function()
        {
         return"maskContentUnits";
        }),
        MaskUnits:Runtime.Field(function()
        {
         return"maskUnits";
        }),
        Max:Runtime.Field(function()
        {
         return"max";
        }),
        Min:Runtime.Field(function()
        {
         return"min";
        }),
        Mode:Runtime.Field(function()
        {
         return"mode";
        }),
        NumOctaves:Runtime.Field(function()
        {
         return"numOctaves";
        }),
        Opacity:Runtime.Field(function()
        {
         return"opacity";
        }),
        Operator:Runtime.Field(function()
        {
         return"operator";
        }),
        Order:Runtime.Field(function()
        {
         return"order";
        }),
        Overflow:Runtime.Field(function()
        {
         return"overflow";
        }),
        PaintOrder:Runtime.Field(function()
        {
         return"paint-order";
        }),
        PathLength:Runtime.Field(function()
        {
         return"pathLength";
        }),
        PatternContentUnits:Runtime.Field(function()
        {
         return"patternContentUnits";
        }),
        PatternTransform:Runtime.Field(function()
        {
         return"patternTransform";
        }),
        PatternUnits:Runtime.Field(function()
        {
         return"patternUnits";
        }),
        PointerEvents:Runtime.Field(function()
        {
         return"pointer-events";
        }),
        Points:Runtime.Field(function()
        {
         return"points";
        }),
        PointsAtX:Runtime.Field(function()
        {
         return"pointsAtX";
        }),
        PointsAtY:Runtime.Field(function()
        {
         return"pointsAtY";
        }),
        PointsAtZ:Runtime.Field(function()
        {
         return"pointsAtZ";
        }),
        PreserveAlpha:Runtime.Field(function()
        {
         return"preserveAlpha";
        }),
        PreserveAspectRatio:Runtime.Field(function()
        {
         return"preserveAspectRatio";
        }),
        PrimitiveUnits:Runtime.Field(function()
        {
         return"primitiveUnits";
        }),
        R:Runtime.Field(function()
        {
         return"r";
        }),
        RX:Runtime.Field(function()
        {
         return"rx";
        }),
        RY:Runtime.Field(function()
        {
         return"ry";
        }),
        Radius:Runtime.Field(function()
        {
         return"radius";
        }),
        RepeatCount:Runtime.Field(function()
        {
         return"repeatCount";
        }),
        RepeatDur:Runtime.Field(function()
        {
         return"repeatDur";
        }),
        RequiredFeatures:Runtime.Field(function()
        {
         return"requiredFeatures";
        }),
        Restart:Runtime.Field(function()
        {
         return"restart";
        }),
        Result:Runtime.Field(function()
        {
         return"result";
        }),
        Scale:Runtime.Field(function()
        {
         return"scale";
        }),
        Seed:Runtime.Field(function()
        {
         return"seed";
        }),
        ShapeRendering:Runtime.Field(function()
        {
         return"shape-rendering";
        }),
        SpecularConstant:Runtime.Field(function()
        {
         return"specularConstant";
        }),
        SpecularExponent:Runtime.Field(function()
        {
         return"specularExponent";
        }),
        StdDeviation:Runtime.Field(function()
        {
         return"stdDeviation";
        }),
        StitchTiles:Runtime.Field(function()
        {
         return"stitchTiles";
        }),
        StopColor:Runtime.Field(function()
        {
         return"stop-color";
        }),
        StopOpacity:Runtime.Field(function()
        {
         return"stop-opacity";
        }),
        Stroke:Runtime.Field(function()
        {
         return"stroke";
        }),
        StrokeDashArray:Runtime.Field(function()
        {
         return"stroke-dasharray";
        }),
        StrokeDashOffset:Runtime.Field(function()
        {
         return"stroke-dashoffset";
        }),
        StrokeLineCap:Runtime.Field(function()
        {
         return"stroke-linecap";
        }),
        StrokeLineJoin:Runtime.Field(function()
        {
         return"stroke-linejoin";
        }),
        StrokeMiterLimit:Runtime.Field(function()
        {
         return"stroke-miterlimit";
        }),
        StrokeOpacity:Runtime.Field(function()
        {
         return"stroke-opacity";
        }),
        StrokeWidth:Runtime.Field(function()
        {
         return"stroke-width";
        }),
        Style:Runtime.Field(function()
        {
         return"style";
        }),
        SurfaceScale:Runtime.Field(function()
        {
         return"surfaceScale";
        }),
        TargetX:Runtime.Field(function()
        {
         return"targetX";
        }),
        TargetY:Runtime.Field(function()
        {
         return"targetY";
        }),
        TextAnchor:Runtime.Field(function()
        {
         return"text-anchor";
        }),
        TextDecoration:Runtime.Field(function()
        {
         return"text-decoration";
        }),
        TextRendering:Runtime.Field(function()
        {
         return"text-rendering";
        }),
        To:Runtime.Field(function()
        {
         return"to";
        }),
        Transform:Runtime.Field(function()
        {
         return"transform";
        }),
        Type:Runtime.Field(function()
        {
         return"type";
        }),
        Values:Runtime.Field(function()
        {
         return"values";
        }),
        ViewBox:Runtime.Field(function()
        {
         return"viewBox";
        }),
        Visibility:Runtime.Field(function()
        {
         return"visibility";
        }),
        Width:Runtime.Field(function()
        {
         return"width";
        }),
        WordSpacing:Runtime.Field(function()
        {
         return"word-spacing";
        }),
        WritingMode:Runtime.Field(function()
        {
         return"writing-mode";
        }),
        X:Runtime.Field(function()
        {
         return"x";
        }),
        X1:Runtime.Field(function()
        {
         return"x1";
        }),
        X2:Runtime.Field(function()
        {
         return"x2";
        }),
        XChannelSelector:Runtime.Field(function()
        {
         return"xChannelSelector";
        }),
        Y:Runtime.Field(function()
        {
         return"y";
        }),
        Y1:Runtime.Field(function()
        {
         return"y1";
        }),
        Y2:Runtime.Field(function()
        {
         return"y2";
        }),
        YChannelSelector:Runtime.Field(function()
        {
         return"yChannelSelector";
        }),
        Z:Runtime.Field(function()
        {
         return"z";
        })
       },
       SvgElements:{
        A:function(ats,ch)
        {
         return Doc.SvgElement("a",ats,ch);
        },
        AltGlyph:function(ats,ch)
        {
         return Doc.SvgElement("altglyph",ats,ch);
        },
        AltGlyphDef:function(ats,ch)
        {
         return Doc.SvgElement("altglyphdef",ats,ch);
        },
        AltGlyphItem:function(ats,ch)
        {
         return Doc.SvgElement("altglyphitem",ats,ch);
        },
        Animate:function(ats,ch)
        {
         return Doc.SvgElement("animate",ats,ch);
        },
        AnimateColor:function(ats,ch)
        {
         return Doc.SvgElement("animatecolor",ats,ch);
        },
        AnimateMotion:function(ats,ch)
        {
         return Doc.SvgElement("animatemotion",ats,ch);
        },
        AnimateTransform:function(ats,ch)
        {
         return Doc.SvgElement("animatetransform",ats,ch);
        },
        Circle:function(ats,ch)
        {
         return Doc.SvgElement("circle",ats,ch);
        },
        ClipPath:function(ats,ch)
        {
         return Doc.SvgElement("clippath",ats,ch);
        },
        ColorProfile:function(ats,ch)
        {
         return Doc.SvgElement("color-profile",ats,ch);
        },
        Cursor:function(ats,ch)
        {
         return Doc.SvgElement("cursor",ats,ch);
        },
        Defs:function(ats,ch)
        {
         return Doc.SvgElement("defs",ats,ch);
        },
        Desc:function(ats,ch)
        {
         return Doc.SvgElement("desc",ats,ch);
        },
        Ellipse:function(ats,ch)
        {
         return Doc.SvgElement("ellipse",ats,ch);
        },
        FeBlend:function(ats,ch)
        {
         return Doc.SvgElement("feblend",ats,ch);
        },
        FeColorMatrix:function(ats,ch)
        {
         return Doc.SvgElement("fecolormatrix",ats,ch);
        },
        FeComponentTransfer:function(ats,ch)
        {
         return Doc.SvgElement("fecomponenttransfer",ats,ch);
        },
        FeComposite:function(ats,ch)
        {
         return Doc.SvgElement("fecomposite",ats,ch);
        },
        FeConvolveMatrix:function(ats,ch)
        {
         return Doc.SvgElement("feconvolvematrix",ats,ch);
        },
        FeDiffuseLighting:function(ats,ch)
        {
         return Doc.SvgElement("fediffuselighting",ats,ch);
        },
        FeDisplacementMap:function(ats,ch)
        {
         return Doc.SvgElement("fedisplacementmap",ats,ch);
        },
        FeDistantLight:function(ats,ch)
        {
         return Doc.SvgElement("fedistantlight",ats,ch);
        },
        FeFlood:function(ats,ch)
        {
         return Doc.SvgElement("feflood",ats,ch);
        },
        FeFuncA:function(ats,ch)
        {
         return Doc.SvgElement("fefunca",ats,ch);
        },
        FeFuncB:function(ats,ch)
        {
         return Doc.SvgElement("fefuncb",ats,ch);
        },
        FeFuncG:function(ats,ch)
        {
         return Doc.SvgElement("fefuncg",ats,ch);
        },
        FeFuncR:function(ats,ch)
        {
         return Doc.SvgElement("fefuncr",ats,ch);
        },
        FeGaussianBlur:function(ats,ch)
        {
         return Doc.SvgElement("fegaussianblur",ats,ch);
        },
        FeImage:function(ats,ch)
        {
         return Doc.SvgElement("feimage",ats,ch);
        },
        FeMerge:function(ats,ch)
        {
         return Doc.SvgElement("femerge",ats,ch);
        },
        FeMergeNode:function(ats,ch)
        {
         return Doc.SvgElement("femergenode",ats,ch);
        },
        FeMorphology:function(ats,ch)
        {
         return Doc.SvgElement("femorphology",ats,ch);
        },
        FeOffset:function(ats,ch)
        {
         return Doc.SvgElement("feoffset",ats,ch);
        },
        FePointLight:function(ats,ch)
        {
         return Doc.SvgElement("fepointlight",ats,ch);
        },
        FeSpecularLighting:function(ats,ch)
        {
         return Doc.SvgElement("fespecularlighting",ats,ch);
        },
        FeSpotLight:function(ats,ch)
        {
         return Doc.SvgElement("fespotlight",ats,ch);
        },
        FeTile:function(ats,ch)
        {
         return Doc.SvgElement("fetile",ats,ch);
        },
        FeTurbulence:function(ats,ch)
        {
         return Doc.SvgElement("feturbulence",ats,ch);
        },
        Filter:function(ats,ch)
        {
         return Doc.SvgElement("filter",ats,ch);
        },
        Font:function(ats,ch)
        {
         return Doc.SvgElement("font",ats,ch);
        },
        FontFace:function(ats,ch)
        {
         return Doc.SvgElement("font-face",ats,ch);
        },
        FontFaceFormat:function(ats,ch)
        {
         return Doc.SvgElement("font-face-format",ats,ch);
        },
        FontFaceName:function(ats,ch)
        {
         return Doc.SvgElement("font-face-name",ats,ch);
        },
        FontFaceSrc:function(ats,ch)
        {
         return Doc.SvgElement("font-face-src",ats,ch);
        },
        FontFaceUri:function(ats,ch)
        {
         return Doc.SvgElement("font-face-uri",ats,ch);
        },
        ForeignObject:function(ats,ch)
        {
         return Doc.SvgElement("foreignobject",ats,ch);
        },
        G:function(ats,ch)
        {
         return Doc.SvgElement("g",ats,ch);
        },
        Glyph:function(ats,ch)
        {
         return Doc.SvgElement("glyph",ats,ch);
        },
        GlyphRef:function(ats,ch)
        {
         return Doc.SvgElement("glyphref",ats,ch);
        },
        HKern:function(ats,ch)
        {
         return Doc.SvgElement("hkern",ats,ch);
        },
        Image:function(ats,ch)
        {
         return Doc.SvgElement("image",ats,ch);
        },
        Line:function(ats,ch)
        {
         return Doc.SvgElement("line",ats,ch);
        },
        LinearGradient:function(ats,ch)
        {
         return Doc.SvgElement("lineargradient",ats,ch);
        },
        MPath:function(ats,ch)
        {
         return Doc.SvgElement("mpath",ats,ch);
        },
        Marker:function(ats,ch)
        {
         return Doc.SvgElement("marker",ats,ch);
        },
        Mask:function(ats,ch)
        {
         return Doc.SvgElement("mask",ats,ch);
        },
        Metadata:function(ats,ch)
        {
         return Doc.SvgElement("metadata",ats,ch);
        },
        MissingGlyph:function(ats,ch)
        {
         return Doc.SvgElement("missing-glyph",ats,ch);
        },
        Path:function(ats,ch)
        {
         return Doc.SvgElement("path",ats,ch);
        },
        Pattern:function(ats,ch)
        {
         return Doc.SvgElement("pattern",ats,ch);
        },
        Polygon:function(ats,ch)
        {
         return Doc.SvgElement("polygon",ats,ch);
        },
        Polyline:function(ats,ch)
        {
         return Doc.SvgElement("polyline",ats,ch);
        },
        RadialGradient:function(ats,ch)
        {
         return Doc.SvgElement("radialgradient",ats,ch);
        },
        Rect:function(ats,ch)
        {
         return Doc.SvgElement("rect",ats,ch);
        },
        Script:function(ats,ch)
        {
         return Doc.SvgElement("script",ats,ch);
        },
        Set:function(ats,ch)
        {
         return Doc.SvgElement("set",ats,ch);
        },
        Stop:function(ats,ch)
        {
         return Doc.SvgElement("stop",ats,ch);
        },
        Style:function(ats,ch)
        {
         return Doc.SvgElement("style",ats,ch);
        },
        Svg:function(ats,ch)
        {
         return Doc.SvgElement("svg",ats,ch);
        },
        Switch:function(ats,ch)
        {
         return Doc.SvgElement("switch",ats,ch);
        },
        Symbol:function(ats,ch)
        {
         return Doc.SvgElement("symbol",ats,ch);
        },
        TRef:function(ats,ch)
        {
         return Doc.SvgElement("tref",ats,ch);
        },
        TSpan:function(ats,ch)
        {
         return Doc.SvgElement("tspan",ats,ch);
        },
        Text:function(ats,ch)
        {
         return Doc.SvgElement("text",ats,ch);
        },
        TextPath:function(ats,ch)
        {
         return Doc.SvgElement("textpath",ats,ch);
        },
        Title:function(ats,ch)
        {
         return Doc.SvgElement("title",ats,ch);
        },
        Use:function(ats,ch)
        {
         return Doc.SvgElement("use",ats,ch);
        },
        VKern:function(ats,ch)
        {
         return Doc.SvgElement("vkern",ats,ch);
        },
        View:function(ats,ch)
        {
         return Doc.SvgElement("view",ats,ch);
        }
       },
       TBody:function(atr,ch)
       {
        return Elements.TBody(atr,ch);
       },
       TBody0:function(ch)
       {
        return Elements.TBody(Runtime.New(T,{
         $:0
        }),ch);
       },
       TD:function(atr,ch)
       {
        return Elements.TD(atr,ch);
       },
       TD0:function(ch)
       {
        return Elements.TD(Runtime.New(T,{
         $:0
        }),ch);
       },
       THead:function(atr,ch)
       {
        return Elements.THead(atr,ch);
       },
       THead0:function(ch)
       {
        return Elements.THead(Runtime.New(T,{
         $:0
        }),ch);
       },
       TR:function(atr,ch)
       {
        return Elements.TR(atr,ch);
       },
       TR0:function(ch)
       {
        return Elements.TR(Runtime.New(T,{
         $:0
        }),ch);
       },
       Table:function(atr,ch)
       {
        return Elements.Table(atr,ch);
       },
       Table0:function(ch)
       {
        return Elements.Table(Runtime.New(T,{
         $:0
        }),ch);
       },
       UL:function(atr,ch)
       {
        return Elements.UL(atr,ch);
       },
       UL0:function(ch)
       {
        return Elements.UL(Runtime.New(T,{
         $:0
        }),ch);
       }
      },
      Input:{
       ActivateButtonListener:Runtime.Field(function()
       {
        var _buttonListener_39_1;
        _buttonListener_39_1=function(evt,down)
        {
         var matchValue;
         matchValue=evt.button;
         return matchValue===0?Var.Set(Input.MouseBtnSt1().Left,down):matchValue===1?Var.Set(Input.MouseBtnSt1().Middle,down):matchValue===2?Var.Set(Input.MouseBtnSt1().Right,down):null;
        };
        if(!Input.MouseBtnSt1().Active)
         {
          Input.MouseBtnSt1().Active=true;
          document.addEventListener("mousedown",function(evt)
          {
           return _buttonListener_39_1(evt,true);
          },false);
          return document.addEventListener("mouseup",function(evt)
          {
           return _buttonListener_39_1(evt,false);
          },false);
         }
        else
         {
          return null;
         }
       }),
       ActivateKeyListener:Runtime.Field(function()
       {
        if(!Input.KeyListenerState().KeyListenerActive)
         {
          jQuery(document).keydown(function(evt)
          {
           var keyCode,arg10;
           keyCode=evt.which;
           Var.Set(Input.KeyListenerState().LastPressed,keyCode);
           arg10=function(xs)
           {
            return!Seq.exists(function(x)
            {
             return x===keyCode;
            },xs)?List.append(xs,List.ofArray([keyCode])):xs;
           };
           return Var.Update(Input.KeyListenerState().KeysPressed,arg10);
          });
          jQuery(document).keyup(function(evt)
          {
           var keyCode,predicate,arg10;
           keyCode=evt.which;
           predicate=function(x)
           {
            return x!==keyCode;
           };
           arg10=function(list)
           {
            return List.filter(predicate,list);
           };
           return Var.Update(Input.KeyListenerState().KeysPressed,arg10);
          });
          return;
         }
        else
         {
          return null;
         }
       }),
       KeyListenerState:Runtime.Field(function()
       {
        return{
         KeysPressed:Var1.Create(Runtime.New(T,{
          $:0
         })),
         KeyListenerActive:false,
         LastPressed:Var1.Create(-1)
        };
       }),
       Keyboard:Runtime.Class({},{
        IsPressed:function(key)
        {
         var predicate;
         Input.ActivateKeyListener();
         predicate=function(x)
         {
          return x===key;
         };
         return View1.Map(function(list)
         {
          return Seq.exists(predicate,list);
         },Input.KeyListenerState().KeysPressed.get_View());
        },
        get_KeysPressed:function()
        {
         Input.ActivateKeyListener();
         return Input.KeyListenerState().KeysPressed.get_View();
        },
        get_LastPressed:function()
        {
         Input.ActivateKeyListener();
         return Input.KeyListenerState().LastPressed.get_View();
        }
       }),
       Mouse:Runtime.Class({},{
        get_LeftPressed:function()
        {
         Input.ActivateButtonListener();
         return Input.MouseBtnSt1().Left.get_View();
        },
        get_MiddlePressed:function()
        {
         Input.ActivateButtonListener();
         return Input.MouseBtnSt1().Middle.get_View();
        },
        get_MousePressed:function()
        {
         Input.ActivateButtonListener();
         return View.Apply(View.Apply(View.Apply(View.Const(function(l)
         {
          return function(m)
          {
           return function(r)
           {
            return(l?true:m)?true:r;
           };
          };
         }),Input.MouseBtnSt1().Left.get_View()),Input.MouseBtnSt1().Middle.get_View()),Input.MouseBtnSt1().Right.get_View());
        },
        get_Position:function()
        {
         var onMouseMove;
         onMouseMove=function(evt)
         {
          var arg00;
          arg00=Input.MousePosSt1().PosV;
          return(Runtime.Tupled(function(arg10)
          {
           return Var.Set(arg00,arg10);
          }))([evt.clientX,evt.clientY]);
         };
         if(!Input.MousePosSt1().Active)
          {
           document.addEventListener("mousemove",onMouseMove,false);
           Input.MousePosSt1().Active=true;
          }
         return View1.FromVar(Input.MousePosSt1().PosV);
        },
        get_RightPressed:function()
        {
         Input.ActivateButtonListener();
         return Input.MouseBtnSt1().Right.get_View();
        }
       }),
       MouseBtnSt1:Runtime.Field(function()
       {
        return{
         Active:false,
         Left:Var1.Create(false),
         Middle:Var1.Create(false),
         Right:Var1.Create(false)
        };
       }),
       MousePosSt1:Runtime.Field(function()
       {
        return{
         Active:false,
         PosV:Var1.Create([0,0])
        };
       })
      },
      Interpolation:Runtime.Class({},{
       get_Double:function()
       {
        return Runtime.New(DoubleInterpolation,{
         $:0
        });
       }
      }),
      Key:Runtime.Class({},{
       Fresh:function()
       {
        return Runtime.New(Key,{
         $:0,
         $0:Fresh.Int()
        });
       }
      }),
      ListModel1:Runtime.Class({
       Add:function(item)
       {
        var v,m=this;
        v=this.Var.get_Value();
        if(!ListModels.Contains(this.Key,item,v))
         {
          v.push(item);
          return this.Var.set_Value(v);
         }
        else
         {
          v[Arrays.FindIndex(function(it)
          {
           return Unchecked.Equals(m.Key.call(null,it),m.Key.call(null,item));
          },v)]=item;
          return m.Var.set_Value(v);
         }
       },
       Iter:function(fn)
       {
        return Arrays.iter(fn,this.Var.get_Value());
       },
       Remove:function(item)
       {
        var v,keyFn,k;
        v=this.Var.get_Value();
        if(ListModels.Contains(this.Key,item,v))
         {
          keyFn=this.Key;
          k=keyFn(item);
          return this.Var.set_Value(Arrays.filter(function(i)
          {
           return!Unchecked.Equals(keyFn(i),k);
          },v));
         }
        else
         {
          return null;
         }
       }
      },{
       Create:function(key,init)
       {
        var _var;
        _var=Var1.Create(Seq.toArray(Seq.distinctBy(key,init)));
        return Runtime.New(ListModel1,{
         Key:key,
         Var:_var,
         View:View1.Map(function(x)
         {
          return x.slice();
         },_var.get_View())
        });
       },
       FromSeq:function(xs)
       {
        return ListModel1.Create(function(x)
        {
         return x;
        },xs);
       },
       View:function(m)
       {
        return m.View;
       }
      }),
      ListModels:{
       Contains:function(keyFn,item,xs)
       {
        var t;
        t=keyFn(item);
        return Seq.exists(function(it)
        {
         return Unchecked.Equals(keyFn(it),t);
        },xs);
       }
      },
      Model:Runtime.Class({},{
       Update:function(update,_arg1)
       {
        return Var.Update(_arg1.$0,function(x)
        {
         update(x);
         return x;
        });
       },
       View:function(_arg2)
       {
        return _arg2.$1;
       }
      }),
      Model1:Runtime.Class({
       get_View:function()
       {
        return Model.View(this);
       }
      },{
       Create:function(proj,init)
       {
        var _var;
        _var=Var1.Create(init);
        return Runtime.New(Model1,{
         $:0,
         $0:_var,
         $1:View1.Map(proj,_var.get_View())
        });
       }
      }),
      Route:{
       Append:function(_arg2,_arg1)
       {
        return{
         $:0,
         $0:AppendList.Append(_arg2.$0,_arg1.$0)
        };
       },
       FromList:function(xs)
       {
        return{
         $:0,
         $0:AppendList.FromArray(Arrays.ofSeq(xs))
        };
       },
       MakeHash:function(_arg1)
       {
        return Strings.concat("/",Arrays.map(function(x)
        {
         return encodeURIComponent(x);
        },AppendList.ToArray(_arg1.$0)));
       },
       NoHash:function(s)
       {
        return Strings.StartsWith(s,"#")?s.substring(1):s;
       },
       ParseHash:function(hash)
       {
        return{
         $:0,
         $0:AppendList.FromArray(Arrays.map(function(x)
         {
          return decodeURIComponent(x);
         },Strings.SplitChars(Route.NoHash(hash),[47],1)))
        };
       },
       SameHash:function(a,b)
       {
        return Route.NoHash(a)===Route.NoHash(b);
       },
       ToList:function(_arg1)
       {
        return List.ofArray(AppendList.ToArray(_arg1.$0));
       }
      },
      RouteMap:Runtime.Class({},{
       Create:function(ser,des)
       {
        return{
         Des:des,
         Ser:ser
        };
       },
       Install:function(map)
       {
        return Routing.InstallMap(map);
       }
      }),
      Router:Runtime.Class({},{
       Merge:function(sites)
       {
        return Routing.MergeRouters(sites);
       },
       Prefix:function(prefix,_arg1)
       {
        return{
         $:0,
         $0:_arg1.$0,
         $1:Trie.Prefix(prefix,_arg1.$1)
        };
       },
       Route:function(r,init,render)
       {
        return Routing.DefineRoute(r,init,render);
       }
      }),
      Router1:Runtime.Class({},{
       Dir:function(prefix,sites)
       {
        return Router.Prefix(prefix,Router.Merge(sites));
       },
       Install:function(key,site)
       {
        return Routing.Install(key,site);
       }
      }),
      Routing:{
       ComputeBodies:function(trie)
       {
        var d;
        d=Dictionary.New2();
        Arrays.iter(function(body)
        {
         return d.set_Item(body.RouteId,body);
        },Trie.ToArray(trie));
        return d;
       },
       DefineRoute:function(r,init,render)
       {
        var state,id,site,t;
        state=Var1.Create(init);
        id=Fresh.Int();
        site=(render({
         $:0,
         $0:id
        }))(state);
        t=Trie.Leaf({
         $:0,
         $0:id,
         $1:function(ctx)
         {
          View.Sink(function(va)
          {
           return ctx.UpdateRoute.call(null,Routing.DoLink(r,va));
          },state.get_View());
          return{
           OnRouteChanged:function(route)
           {
            return state.set_Value(Routing.DoRoute(r,route));
           },
           OnSelect:function()
           {
            return ctx.UpdateRoute.call(null,Routing.DoLink(r,state.get_Value()));
           },
           RouteId:id,
           RouteValue:site
          };
         }
        });
        return{
         $:0,
         $0:{
          $:1,
          $0:site
         },
         $1:t
        };
       },
       DoLink:function(map,va)
       {
        return Route.FromList(map.Ser.call(null,va));
       },
       DoRoute:function(map,route)
       {
        return map.Des.call(null,Route.ToList(route));
       },
       Install:function(key,_arg1)
       {
        var va,site,currentRoute,state,siteTrie,parseRoute,matchValue,glob,site1,updateRoute;
        va=_arg1.$0;
        site=_arg1.$1;
        currentRoute=Routing.InstallMap({
         Des:function(xs)
         {
          return Route.FromList(xs);
         },
         Ser:function(_arg00_)
         {
          return Route.ToList(_arg00_);
         }
        });
        state={
         Bodies:Abbrev.U(),
         CurrentRoute:currentRoute,
         CurrentSite:0,
         Selection:Abbrev.U()
        };
        siteTrie=Trie.Map(function(prefix)
        {
         return function(_arg11)
         {
          var id;
          id=_arg11.$0;
          return _arg11.$1.call(null,{
           UpdateRoute:function(rest)
           {
            return Routing.OnInternalSiteUpdate(state,id,prefix,rest);
           }
          });
         };
        },site);
        state.Bodies=Routing.ComputeBodies(siteTrie);
        parseRoute=function(route)
        {
         return Trie.Lookup(siteTrie,Route.ToList(route));
        };
        matchValue=parseRoute(currentRoute.get_Value());
        if(matchValue.$==0)
         {
          site1=matchValue.$0;
          state.CurrentSite=site1.RouteId;
          glob=Var1.Create(site1.RouteValue);
         }
        else
         {
          glob=Var1.Create(va.$==1?va.$0:Operators.FailWith("Site.Install fails on empty site"));
         }
        state.Selection=glob;
        View.Sink(function(site2)
        {
         return Routing.OnSelectSite(state,key(site2));
        },glob.get_View());
        updateRoute=function(route)
        {
         var matchValue1;
         matchValue1=parseRoute(route);
         return matchValue1.$==1?null:Routing.OnGlobalRouteChange(state,matchValue1.$0,Route.FromList(matchValue1.$1));
        };
        updateRoute(currentRoute.get_Value());
        View.Sink(updateRoute,currentRoute.get_View());
        return glob;
       },
       InstallMap:function(rt)
       {
        var cur,_var,onUpdate;
        cur=function()
        {
         return rt.Des.call(null,Route.ToList(Route.ParseHash(window.location.hash)));
        };
        _var=Var1.Create(cur(null));
        onUpdate=function()
        {
         var value;
         value=cur(null);
         return!Unchecked.Equals(rt.Ser.call(null,_var.get_Value()),rt.Ser.call(null,value))?_var.set_Value(value):null;
        };
        window.onpopstate=onUpdate;
        window.onhashchange=onUpdate;
        View.Sink(function(loc)
        {
         var ha;
         ha=Route.MakeHash(Route.FromList(rt.Ser.call(null,loc)));
         return!Route.SameHash(window.location.hash,ha)?void(window.location.hash=ha):null;
        },_var.get_View());
        return _var;
       },
       MergeRouters:function(sites)
       {
        var sites1,merged,value;
        sites1=Seq.toArray(sites);
        merged=Trie.Merge(Seq.map(function(_arg1)
        {
         return _arg1.$1;
        },sites1));
        value=Seq.tryPick(function(_arg2)
        {
         return _arg2.$0;
        },sites1);
        return merged.$==1?{
         $:0,
         $0:value,
         $1:merged.$0
        }:Operators.FailWith("Invalid Site.Merge: need more prefix disambiguation");
       },
       OnGlobalRouteChange:function(state,site,rest)
       {
        if(state.CurrentSite!==site.RouteId)
         {
          state.CurrentSite=site.RouteId;
          state.Selection.set_Value(site.RouteValue);
         }
        return site.OnRouteChanged.call(null,rest);
       },
       OnInternalSiteUpdate:function(state,ix,prefix,rest)
       {
        return state.CurrentSite===ix?Routing.SetCurrentRoute(state,Route.Append(Route.FromList(prefix),rest)):null;
       },
       OnSelectSite:function(state,_arg1)
       {
        var id;
        id=_arg1.$0;
        if(state.CurrentSite!==id)
         {
          state.CurrentSite=id;
          return state.Bodies.get_Item(id).OnSelect.call(null,null);
         }
        else
         {
          return null;
         }
       },
       SetCurrentRoute:function(state,route)
       {
        return!Unchecked.Equals(state.CurrentRoute.get_Value(),route)?state.CurrentRoute.set_Value(route):null;
       }
      },
      Snap:{
       Bind:function(f,snap)
       {
        var res,onObs;
        res=Snap.Create();
        onObs=function()
        {
         return Snap.MarkObsolete(res);
        };
        Snap.When(snap,function(x)
        {
         var y;
         y=f(x);
         return Snap.When(y,function(v)
         {
          return(Snap.IsForever(y)?Snap.IsForever(snap):false)?Snap.MarkForever(res,v):Snap.MarkReady(res,v);
         },onObs);
        },onObs);
        return res;
       },
       Create:function()
       {
        return Snap.Make({
         $:3,
         $0:[],
         $1:[]
        });
       },
       CreateForever:function(v)
       {
        return Snap.Make({
         $:0,
         $0:v
        });
       },
       CreateWithValue:function(v)
       {
        return Snap.Make({
         $:2,
         $0:v,
         $1:[]
        });
       },
       IsForever:function(snap)
       {
        return snap.State.$==0?true:false;
       },
       IsObsolete:function(snap)
       {
        return snap.State.$==1?true:false;
       },
       Make:function(st)
       {
        return{
         State:st
        };
       },
       Map:function(fn,sn)
       {
        var matchValue,res;
        matchValue=sn.State;
        if(matchValue.$==0)
         {
          return Snap.CreateForever(fn(matchValue.$0));
         }
        else
         {
          res=Snap.Create();
          Snap.When(sn,function(x)
          {
           return Snap.MarkDone(res,sn,fn(x));
          },function()
          {
           return Snap.MarkObsolete(res);
          });
          return res;
         }
       },
       Map2:function(fn,sn1,sn2)
       {
        var matchValue,y,y1,res,v1,v2,obs,cont;
        matchValue=[sn1.State,sn2.State];
        if(matchValue[0].$==0)
         {
          if(matchValue[1].$==0)
           {
            y=matchValue[1].$0;
            return Snap.CreateForever((fn(matchValue[0].$0))(y));
           }
          else
           {
            return Snap.Map(fn(matchValue[0].$0),sn2);
           }
         }
        else
         {
          if(matchValue[1].$==0)
           {
            y1=matchValue[1].$0;
            return Snap.Map(function(x)
            {
             return(fn(x))(y1);
            },sn1);
           }
          else
           {
            res=Snap.Create();
            v1={
             contents:{
              $:0
             }
            };
            v2={
             contents:{
              $:0
             }
            };
            obs=function()
            {
             v1.contents={
              $:0
             };
             v2.contents={
              $:0
             };
             return Snap.MarkObsolete(res);
            };
            cont=function()
            {
             var matchValue1,x,y2;
             matchValue1=[v1.contents,v2.contents];
             if(matchValue1[0].$==1)
              {
               if(matchValue1[1].$==1)
                {
                 x=matchValue1[0].$0;
                 y2=matchValue1[1].$0;
                 return(Snap.IsForever(sn1)?Snap.IsForever(sn2):false)?Snap.MarkForever(res,(fn(x))(y2)):Snap.MarkReady(res,(fn(x))(y2));
                }
               else
                {
                 return null;
                }
              }
             else
              {
               return null;
              }
            };
            Snap.When(sn1,function(x)
            {
             v1.contents={
              $:1,
              $0:x
             };
             return cont(null);
            },obs);
            Snap.When(sn2,function(y2)
            {
             v2.contents={
              $:1,
              $0:y2
             };
             return cont(null);
            },obs);
            return res;
           }
         }
       },
       MapAsync:function(fn,snap)
       {
        var res;
        res=Snap.Create();
        Snap.When(snap,function(v)
        {
         return Async.StartTo(fn(v),function(v1)
         {
          return Snap.MarkDone(res,snap,v1);
         });
        },function()
        {
         return Snap.MarkObsolete(res);
        });
        return res;
       },
       MarkDone:function(res,sn,v)
       {
        return Snap.IsForever(sn)?Snap.MarkForever(res,v):Snap.MarkReady(res,v);
       },
       MarkForever:function(sn,v)
       {
        var matchValue,q;
        matchValue=sn.State;
        if(matchValue.$==3)
         {
          q=matchValue.$0;
          sn.State={
           $:0,
           $0:v
          };
          return JQueue.Iter(function(k)
          {
           return k(v);
          },q);
         }
        else
         {
          return null;
         }
       },
       MarkObsolete:function(sn)
       {
        var matchValue,ks,ks1;
        matchValue=sn.State;
        if(matchValue.$==1)
         {
          return null;
         }
        else
         {
          if(matchValue.$==2)
           {
            ks=matchValue.$1;
            sn.State={
             $:1
            };
            return JQueue.Iter(function(k)
            {
             return k(null);
            },ks);
           }
          else
           {
            if(matchValue.$==3)
             {
              ks1=matchValue.$1;
              sn.State={
               $:1
              };
              return JQueue.Iter(function(k)
              {
               return k(null);
              },ks1);
             }
            else
             {
              return null;
             }
           }
         }
       },
       MarkReady:function(sn,v)
       {
        var matchValue,q1;
        matchValue=sn.State;
        if(matchValue.$==3)
         {
          q1=matchValue.$0;
          sn.State={
           $:2,
           $0:v,
           $1:matchValue.$1
          };
          return JQueue.Iter(function(k)
          {
           return k(v);
          },q1);
         }
        else
         {
          return null;
         }
       },
       SnapshotOn:function(sn1,sn2)
       {
        var matchValue,res,v,isInitialised;
        matchValue=[sn1.State,sn2.State];
        if(matchValue[1].$==0)
         {
          return Snap.CreateForever(matchValue[1].$0);
         }
        else
         {
          res=Snap.Create();
          v={
           contents:{
            $:0
           }
          };
          isInitialised={
           contents:false
          };
          Snap.When(sn1,function()
          {
           var matchValue1;
           matchValue1=v.contents;
           return matchValue1.$==1?Snap.IsForever(sn2)?Snap.MarkForever(res,matchValue1.$0):matchValue1.$==1?Snap.MarkReady(res,matchValue1.$0):null:matchValue1.$==1?Snap.MarkReady(res,matchValue1.$0):null;
          },function()
          {
           v.contents={
            $:0
           };
           return Snap.MarkObsolete(res);
          });
          Snap.When(sn2,function(y)
          {
           v.contents={
            $:1,
            $0:y
           };
           if(!isInitialised.contents)
            {
             isInitialised.contents=true;
             return Snap.MarkReady(res,y);
            }
           else
            {
             return null;
            }
          },function()
          {
          });
          return res;
         }
       },
       UpdateWhile:function(snPred,sn2)
       {
        var matchValue,res,v1,v2,isInitialised,obs,obsVal,cont,res1,v11,v21,isInitialised1,obs1,obsVal1,cont1;
        matchValue=[snPred.State,sn2.State];
        if(matchValue[0].$==0)
         {
          if(matchValue[0].$0)
           {
            return sn2;
           }
          else
           {
            if(matchValue[1].$==0)
             {
              return Snap.CreateForever(matchValue[1].$0);
             }
            else
             {
              res=Snap.Create();
              v1={
               contents:{
                $:0
               }
              };
              v2={
               contents:{
                $:0
               }
              };
              isInitialised={
               contents:false
              };
              obs=function()
              {
               v1.contents={
                $:0
               };
               v2.contents={
                $:0
               };
               return Snap.MarkObsolete(res);
              };
              obsVal=function()
              {
               var matchValue1;
               matchValue1=v1.contents;
               return matchValue1.$==1?matchValue1.$0?obs(null):null:null;
              };
              cont=function()
              {
               var matchValue1,y;
               matchValue1=[v1.contents,v2.contents];
               if(matchValue1[0].$==1)
                {
                 if(matchValue1[1].$==1)
                  {
                   if(matchValue1[0].$0)
                    {
                     y=matchValue1[1].$0;
                     return Snap.IsForever(snPred)?Snap.MarkForever(res,y):Snap.MarkReady(res,y);
                    }
                   else
                    {
                     return null;
                    }
                  }
                 else
                  {
                   return null;
                  }
                }
               else
                {
                 return null;
                }
              };
              Snap.When(snPred,function(x)
              {
               v1.contents={
                $:1,
                $0:x
               };
               return cont(null);
              },obs);
              Snap.When(sn2,function(y)
              {
               v2.contents={
                $:1,
                $0:y
               };
               if(!isInitialised.contents)
                {
                 isInitialised.contents=true;
                 Snap.MarkReady(res,y);
                }
               return cont(null);
              },obsVal);
              return res;
             }
           }
         }
        else
         {
          if(matchValue[1].$==0)
           {
            return Snap.CreateForever(matchValue[1].$0);
           }
          else
           {
            res1=Snap.Create();
            v11={
             contents:{
              $:0
             }
            };
            v21={
             contents:{
              $:0
             }
            };
            isInitialised1={
             contents:false
            };
            obs1=function()
            {
             v11.contents={
              $:0
             };
             v21.contents={
              $:0
             };
             return Snap.MarkObsolete(res1);
            };
            obsVal1=function()
            {
             var matchValue1;
             matchValue1=v11.contents;
             return matchValue1.$==1?matchValue1.$0?obs1(null):null:null;
            };
            cont1=function()
            {
             var matchValue1,y;
             matchValue1=[v11.contents,v21.contents];
             if(matchValue1[0].$==1)
              {
               if(matchValue1[1].$==1)
                {
                 if(matchValue1[0].$0)
                  {
                   y=matchValue1[1].$0;
                   return Snap.IsForever(snPred)?Snap.MarkForever(res1,y):Snap.MarkReady(res1,y);
                  }
                 else
                  {
                   return null;
                  }
                }
               else
                {
                 return null;
                }
              }
             else
              {
               return null;
              }
            };
            Snap.When(snPred,function(x)
            {
             v11.contents={
              $:1,
              $0:x
             };
             return cont1(null);
            },obs1);
            Snap.When(sn2,function(y)
            {
             v21.contents={
              $:1,
              $0:y
             };
             if(!isInitialised1.contents)
              {
               isInitialised1.contents=true;
               Snap.MarkReady(res1,y);
              }
             return cont1(null);
            },obsVal1);
            return res1;
           }
         }
       },
       When:function(snap,avail,obsolete)
       {
        var matchValue,v,q2;
        matchValue=snap.State;
        if(matchValue.$==1)
         {
          return obsolete(null);
         }
        else
         {
          if(matchValue.$==2)
           {
            v=matchValue.$0;
            JQueue.Add(obsolete,matchValue.$1);
            return avail(v);
           }
          else
           {
            if(matchValue.$==3)
             {
              q2=matchValue.$1;
              JQueue.Add(avail,matchValue.$0);
              return JQueue.Add(obsolete,q2);
             }
            else
             {
              return avail(matchValue.$0);
             }
           }
         }
       }
      },
      Trans:Runtime.Class({},{
       CanAnimateExit:function(tr)
       {
        return(tr.TFlags&4)!==0;
       },
       Change:function(ch,tr)
       {
        return{
         TChange:ch,
         TEnter:tr.TEnter,
         TExit:tr.TExit,
         TFlags:tr.TFlags|1
        };
       },
       Create:function(ch)
       {
        return{
         TChange:ch,
         TEnter:function(t)
         {
          return An.Const(t);
         },
         TExit:function(t)
         {
          return An.Const(t);
         },
         TFlags:1
        };
       },
       Enter:function(f,tr)
       {
        return{
         TChange:tr.TChange,
         TEnter:f,
         TExit:tr.TExit,
         TFlags:tr.TFlags|2
        };
       },
       Exit:function(f,tr)
       {
        return{
         TChange:tr.TChange,
         TEnter:tr.TEnter,
         TExit:f,
         TFlags:tr.TFlags|4
        };
       },
       Trivial:function()
       {
        return{
         TChange:function()
         {
          return function(y)
          {
           return An.Const(y);
          };
         },
         TEnter:function(t)
         {
          return An.Const(t);
         },
         TExit:function(t)
         {
          return An.Const(t);
         },
         TFlags:0
        };
       }
      }),
      Trans1:Runtime.Class({},{
       AnimateChange:function(tr,x,y)
       {
        return(tr.TChange.call(null,x))(y);
       },
       AnimateEnter:function(tr,x)
       {
        return tr.TEnter.call(null,x);
       },
       AnimateExit:function(tr,x)
       {
        return tr.TExit.call(null,x);
       },
       CanAnimateChange:function(tr)
       {
        return(tr.TFlags&1)!==0;
       },
       CanAnimateEnter:function(tr)
       {
        return(tr.TFlags&2)!==0;
       }
      }),
      Trie:{
       AllSome:function(xs)
       {
        var e,r,ok,matchValue;
        e=Enumerator.Get(xs);
        r=ResizeArrayProxy.New1();
        ok=true;
        while(ok?e.MoveNext():false)
         {
          matchValue=e.get_Current();
          if(matchValue.$==1)
           {
            r.Add(matchValue.$0);
           }
          else
           {
            ok=false;
           }
         }
        return ok?{
         $:1,
         $0:r.ToArray()
        }:{
         $:0
        };
       },
       Empty:function()
       {
        return{
         $:1
        };
       },
       IsLeaf:function(t)
       {
        return t.$==2?true:false;
       },
       Leaf:function(v)
       {
        return{
         $:2,
         $0:v
        };
       },
       Look:function(key,trie)
       {
        var matchValue,ks,matchValue1;
        matchValue=[trie,key];
        if(matchValue[0].$==2)
         {
          return{
           $:0,
           $0:matchValue[0].$0,
           $1:key
          };
         }
        else
         {
          if(matchValue[0].$==0)
           {
            if(matchValue[1].$==1)
             {
              ks=matchValue[1].$1;
              matchValue1=MapModule.TryFind(matchValue[1].$0,matchValue[0].$0);
              return matchValue1.$==0?{
               $:1
              }:Trie.Look(ks,matchValue1.$0);
             }
            else
             {
              return{
               $:1
              };
             }
           }
          else
           {
            return{
             $:1
            };
           }
         }
       },
       Lookup:function(trie,key)
       {
        return Trie.Look(Seq.toList(key),trie);
       },
       Map:function(f,trie)
       {
        return Trie.MapLoop(Runtime.New(T,{
         $:0
        }),f,trie);
       },
       MapLoop:function(loc,f,trie)
       {
        var x;
        if(trie.$==1)
         {
          return{
           $:1
          };
         }
        else
         {
          if(trie.$==2)
           {
            x=trie.$0;
            return{
             $:2,
             $0:(f(loc))(x)
            };
           }
          else
           {
            return Trie.TrieBranch(MapModule.Map(function(k)
            {
             return function(v)
             {
              return Trie.MapLoop(List.append(loc,List.ofArray([k])),f,v);
             };
            },trie.$0));
           }
         }
       },
       Mapi:function(f,trie)
       {
        var counter;
        counter={
         contents:0
        };
        return Trie.Map(function(x)
        {
         var c;
         c=counter.contents;
         counter.contents=c+1;
         return(f(c))(x);
        },trie);
       },
       Merge:function(ts)
       {
        var ts1,matchValue;
        ts1=Seq.toArray(ts);
        matchValue=IntrinsicFunctionProxy.GetLength(ts1);
        return matchValue===0?{
         $:1,
         $0:{
          $:1
         }
        }:matchValue===1?{
         $:1,
         $0:ts1[0]
        }:Seq.exists(function(t)
        {
         return Trie.IsLeaf(t);
        },ts1)?{
         $:0
        }:Option.map(function(xs)
        {
         return Trie.TrieBranch(xs);
        },Trie.MergeMaps(function(_arg00_)
        {
         return Trie.Merge(_arg00_);
        },Seq.choose(function(_arg1)
        {
         return _arg1.$==0?{
          $:1,
          $0:_arg1.$0
         }:{
          $:0
         };
        },ts1)));
       },
       MergeMaps:function(merge,maps)
       {
        var x,x1;
        x=Seq.collect(function(table)
        {
         return MapModule.ToSeq(table);
        },maps);
        x1=MapModule.ToSeq(Seq.fold(function(s)
        {
         return Runtime.Tupled(function(tupledArg)
         {
          return Trie.MultiAdd(tupledArg[0],tupledArg[1],s);
         });
        },FSharpMap.New([]),x));
        return Option.map(function(elements)
        {
         return MapModule.OfArray(Seq.toArray(elements));
        },Trie.AllSome(Seq.map(Runtime.Tupled(function(tupledArg)
        {
         var k;
         k=tupledArg[0];
         return Option.map(function(v)
         {
          return[k,v];
         },merge(tupledArg[1]));
        }),x1)));
       },
       MultiAdd:function(key,value,map)
       {
        return map.Add(key,Runtime.New(T,{
         $:1,
         $0:value,
         $1:Trie.MultiFind(key,map)
        }));
       },
       MultiFind:function(key,map)
       {
        return Operators.DefaultArg(MapModule.TryFind(key,map),Runtime.New(T,{
         $:0
        }));
       },
       Prefix:function(key,trie)
       {
        return Trie.TrieBranch(FSharpMap.New(List.ofArray([[key,trie]])));
       },
       ToArray:function(trie)
       {
        var all;
        all=[];
        Trie.Map(function()
        {
         return function(v)
         {
          return JQueue.Add(v,all);
         };
        },trie);
        return JQueue.ToArray(all);
       },
       TrieBranch:function(xs)
       {
        return xs.get_IsEmpty()?{
         $:1
        }:{
         $:0,
         $0:xs
        };
       }
      },
      Var:Runtime.Class({},{
       Observe:function(_var)
       {
        return _var.Snap;
       },
       Set:function(_var,value)
       {
        if(_var.Const)
         {
          return null;
         }
        else
         {
          Snap.MarkObsolete(_var.Snap);
          _var.Current=value;
          _var.Snap=Snap.CreateWithValue(value);
          return;
         }
       },
       SetFinal:function(_var,value)
       {
        if(_var.Const)
         {
          return null;
         }
        else
         {
          _var.Const=true;
          _var.Current=value;
          _var.Snap=Snap.CreateForever(value);
          return;
         }
       },
       Update:function(_var,fn)
       {
        return Var.Set(_var,fn(Var1.Get(_var)));
       }
      }),
      Var1:Runtime.Class({
       get_Value:function()
       {
        return Var1.Get(this);
       },
       get_View:function()
       {
        return View1.FromVar(this);
       },
       set_Value:function(value)
       {
        return Var.Set(this,value);
       }
      },{
       Create:function(v)
       {
        return Runtime.New(Var1,{
         Const:false,
         Current:v,
         Snap:Snap.CreateWithValue(v)
        });
       },
       Get:function(_var)
       {
        return _var.Current;
       }
      }),
      View:Runtime.Class({},{
       Apply:function(fn,view)
       {
        return View1.Map2(function(f)
        {
         return function(x)
         {
          return f(x);
         };
        },fn,view);
       },
       Bind:function(fn,view)
       {
        return View.Join(View1.Map(fn,view));
       },
       Const:function(x)
       {
        var o;
        o=Snap.CreateForever(x);
        return{
         $:0,
         $0:function()
         {
          return o;
         }
        };
       },
       Join:function(_arg9)
       {
        var observe;
        observe=_arg9.$0;
        return View1.CreateLazy(function()
        {
         return Snap.Bind(function(_arg1)
         {
          return _arg1.$0.call(null,null);
         },observe(null));
        });
       },
       Sink:function(act,_arg10)
       {
        var observe,loop;
        observe=_arg10.$0;
        loop=function()
        {
         return Snap.When(observe(null),act,function()
         {
          return Async.Schedule(loop);
         });
        };
        return Async.Schedule(loop);
       }
      }),
      View1:Runtime.Class({},{
       Convert:function(conv,view)
       {
        return View1.ConvertBy(function(x)
        {
         return x;
        },conv,view);
       },
       ConvertBy:function(key,conv,view)
       {
        var state;
        state={
         contents:Dictionary.New2()
        };
        return View1.Map(function(xs)
        {
         var prevState,newState,result;
         prevState=state.contents;
         newState=Dictionary.New2();
         result=Arrays.map(function(x)
         {
          var k,res;
          k=key(x);
          res=prevState.ContainsKey(k)?prevState.get_Item(k):conv(x);
          newState.set_Item(k,res);
          return res;
         },Seq.toArray(xs));
         state.contents=newState;
         return result;
        },view);
       },
       ConvertSeq:function(conv,view)
       {
        return View1.ConvertSeqBy(function(x)
        {
         return x;
        },conv,view);
       },
       ConvertSeqBy:function(key,conv,view)
       {
        var state;
        state={
         contents:Dictionary.New2()
        };
        return View1.Map(function(xs)
        {
         var prevState,newState,result;
         prevState=state.contents;
         newState=Dictionary.New2();
         result=Arrays.map(function(x)
         {
          var k,node,n;
          k=key(x);
          if(prevState.ContainsKey(k))
           {
            n=prevState.get_Item(k);
            Var.Set(n.NVar,x);
            node=n;
           }
          else
           {
            node=View1.ConvertSeqNode(conv,x);
           }
          newState.set_Item(k,node);
          return node.NValue;
         },Seq.toArray(xs));
         state.contents=newState;
         return result;
        },view);
       },
       ConvertSeqNode:function(conv,value)
       {
        var _var,view;
        _var=Var1.Create(value);
        view=View1.FromVar(_var);
        return{
         NValue:conv(view),
         NVar:_var,
         NView:view
        };
       },
       CreateLazy:function(observe)
       {
        var cur;
        cur={
         contents:{
          $:0
         }
        };
        return{
         $:0,
         $0:function()
         {
          var matchValue,sn,sn1;
          matchValue=cur.contents;
          if(matchValue.$==1)
           {
            if(!Snap.IsObsolete(matchValue.$0))
             {
              return matchValue.$0;
             }
            else
             {
              sn=observe(null);
              cur.contents={
               $:1,
               $0:sn
              };
              return sn;
             }
           }
          else
           {
            sn1=observe(null);
            cur.contents={
             $:1,
             $0:sn1
            };
            return sn1;
           }
         }
        };
       },
       FromVar:function(_var)
       {
        return{
         $:0,
         $0:function()
         {
          return Var.Observe(_var);
         }
        };
       },
       Map:function(fn,_arg1)
       {
        var observe;
        observe=_arg1.$0;
        return View1.CreateLazy(function()
        {
         return Snap.Map(fn,observe(null));
        });
       },
       Map2:function(fn,_arg3,_arg2)
       {
        var o1,o2;
        o1=_arg3.$0;
        o2=_arg2.$0;
        return View1.CreateLazy(function()
        {
         return Snap.Map2(fn,o1(null),o2(null));
        });
       },
       MapAsync:function(fn,_arg4)
       {
        var observe;
        observe=_arg4.$0;
        return View1.CreateLazy(function()
        {
         return Snap.MapAsync(fn,observe(null));
        });
       },
       SnapshotOn:function(_arg6,_arg5)
       {
        var o1,o2;
        o1=_arg6.$0;
        o2=_arg5.$0;
        return View1.CreateLazy(function()
        {
         return Snap.SnapshotOn(o1(null),o2(null));
        });
       },
       UpdateWhile:function(_arg8,_arg7)
       {
        var o1,o2;
        o1=_arg8.$0;
        o2=_arg7.$0;
        return View1.CreateLazy(function()
        {
         return Snap.UpdateWhile(o1(null),o2(null));
        });
       },
       get_Do:function()
       {
        return Runtime.New(ViewBuilder,{
         $:0
        });
       }
      }),
      ViewBuilder:Runtime.Class({
       Bind:function(x,f)
       {
        return View.Bind(f,x);
       },
       Return:function(x)
       {
        return View.Const(x);
       }
      })
     }
    }
   }
  }
 });
 Runtime.OnInit(function()
 {
  WebSharper=Runtime.Safe(Global.IntelliFactory.WebSharper);
  IntrinsicFunctionProxy=Runtime.Safe(WebSharper.IntrinsicFunctionProxy);
  Concurrency=Runtime.Safe(WebSharper.Concurrency);
  Array=Runtime.Safe(Global.Array);
  Seq=Runtime.Safe(WebSharper.Seq);
  UI=Runtime.Safe(WebSharper.UI);
  Next=Runtime.Safe(UI.Next);
  Abbrev=Runtime.Safe(Next.Abbrev);
  Fresh=Runtime.Safe(Abbrev.Fresh);
  Collections=Runtime.Safe(WebSharper.Collections);
  HashSet=Runtime.Safe(Collections.HashSet);
  HashSet1=Runtime.Safe(HashSet.HashSet);
  HashSet2=Runtime.Safe(Abbrev.HashSet);
  Arrays=Runtime.Safe(WebSharper.Arrays);
  JQueue=Runtime.Safe(Abbrev.JQueue);
  Unchecked=Runtime.Safe(WebSharper.Unchecked);
  Slot=Runtime.Safe(Abbrev.Slot);
  An=Runtime.Safe(Next.An);
  AppendList=Runtime.Safe(Next.AppendList);
  Anims=Runtime.Safe(Next.Anims);
  window=Runtime.Safe(Global.window);
  Trans1=Runtime.Safe(Next.Trans1);
  Option=Runtime.Safe(WebSharper.Option);
  View1=Runtime.Safe(Next.View1);
  Lazy=Runtime.Safe(WebSharper.Lazy);
  Array1=Runtime.Safe(Abbrev.Array);
  Attrs=Runtime.Safe(Next.Attrs);
  DomUtility=Runtime.Safe(Next.DomUtility);
  Attr=Runtime.Safe(Next.Attr);
  AnimatedAttrNode=Runtime.Safe(Next.AnimatedAttrNode);
  Trans=Runtime.Safe(Next.Trans);
  DynamicAttrNode=Runtime.Safe(Next.DynamicAttrNode);
  View=Runtime.Safe(Next.View);
  Docs=Runtime.Safe(Next.Docs);
  Doc=Runtime.Safe(Next.Doc);
  List=Runtime.Safe(WebSharper.List);
  Var=Runtime.Safe(Next.Var);
  T=Runtime.Safe(List.T);
  Mailbox=Runtime.Safe(Abbrev.Mailbox);
  Operators=Runtime.Safe(WebSharper.Operators);
  NodeSet=Runtime.Safe(Docs.NodeSet);
  DocElemNode=Runtime.Safe(Next.DocElemNode);
  DomNodes=Runtime.Safe(Docs.DomNodes);
  jQuery=Runtime.Safe(Global.jQuery);
  document=Runtime.Safe(Global.document);
  Easing=Runtime.Safe(Next.Easing);
  Easings=Runtime.Safe(Next.Easings);
  Var1=Runtime.Safe(Next.Var1);
  FlowBuilder=Runtime.Safe(Next.FlowBuilder);
  Flow=Runtime.Safe(Next.Flow);
  Html=Runtime.Safe(Next.Html);
  Elements=Runtime.Safe(Html.Elements);
  Input=Runtime.Safe(Next.Input);
  DoubleInterpolation=Runtime.Safe(Next.DoubleInterpolation);
  Key=Runtime.Safe(Next.Key);
  ListModels=Runtime.Safe(Next.ListModels);
  ListModel1=Runtime.Safe(Next.ListModel1);
  Model=Runtime.Safe(Next.Model);
  Model1=Runtime.Safe(Next.Model1);
  Strings=Runtime.Safe(WebSharper.Strings);
  encodeURIComponent=Runtime.Safe(Global.encodeURIComponent);
  decodeURIComponent=Runtime.Safe(Global.decodeURIComponent);
  Route=Runtime.Safe(Next.Route);
  Routing=Runtime.Safe(Next.Routing);
  Trie=Runtime.Safe(Next.Trie);
  Router=Runtime.Safe(Next.Router);
  Dictionary=Runtime.Safe(Collections.Dictionary);
  Snap=Runtime.Safe(Next.Snap);
  Async=Runtime.Safe(Abbrev.Async);
  Enumerator=Runtime.Safe(WebSharper.Enumerator);
  ResizeArray=Runtime.Safe(Collections.ResizeArray);
  ResizeArrayProxy=Runtime.Safe(ResizeArray.ResizeArrayProxy);
  MapModule=Runtime.Safe(Collections.MapModule);
  FSharpMap=Runtime.Safe(Collections.FSharpMap);
  ViewBuilder=Runtime.Safe(Next.ViewBuilder);
  Attributes=Runtime.Safe(Html.Attributes);
  return SvgAttributes=Runtime.Safe(Html.SvgAttributes);
 });
 Runtime.OnLoad(function()
 {
  Input.MousePosSt1();
  Input.MouseBtnSt1();
  Input.KeyListenerState();
  Input.ActivateKeyListener();
  Input.ActivateButtonListener();
  SvgAttributes.Z();
  SvgAttributes.YChannelSelector();
  SvgAttributes.Y2();
  SvgAttributes.Y1();
  SvgAttributes.Y();
  SvgAttributes.XChannelSelector();
  SvgAttributes.X2();
  SvgAttributes.X1();
  SvgAttributes.X();
  SvgAttributes.WritingMode();
  SvgAttributes.WordSpacing();
  SvgAttributes.Width();
  SvgAttributes.Visibility();
  SvgAttributes.ViewBox();
  SvgAttributes.Values();
  SvgAttributes.Type();
  SvgAttributes.Transform();
  SvgAttributes.To();
  SvgAttributes.TextRendering();
  SvgAttributes.TextDecoration();
  SvgAttributes.TextAnchor();
  SvgAttributes.TargetY();
  SvgAttributes.TargetX();
  SvgAttributes.SurfaceScale();
  SvgAttributes.Style();
  SvgAttributes.StrokeWidth();
  SvgAttributes.StrokeOpacity();
  SvgAttributes.StrokeMiterLimit();
  SvgAttributes.StrokeLineJoin();
  SvgAttributes.StrokeLineCap();
  SvgAttributes.StrokeDashOffset();
  SvgAttributes.StrokeDashArray();
  SvgAttributes.Stroke();
  SvgAttributes.StopOpacity();
  SvgAttributes.StopColor();
  SvgAttributes.StitchTiles();
  SvgAttributes.StdDeviation();
  SvgAttributes.SpecularExponent();
  SvgAttributes.SpecularConstant();
  SvgAttributes.ShapeRendering();
  SvgAttributes.Seed();
  SvgAttributes.Scale();
  SvgAttributes.Result();
  SvgAttributes.Restart();
  SvgAttributes.RequiredFeatures();
  SvgAttributes.RepeatDur();
  SvgAttributes.RepeatCount();
  SvgAttributes.Radius();
  SvgAttributes.RY();
  SvgAttributes.RX();
  SvgAttributes.R();
  SvgAttributes.PrimitiveUnits();
  SvgAttributes.PreserveAspectRatio();
  SvgAttributes.PreserveAlpha();
  SvgAttributes.PointsAtZ();
  SvgAttributes.PointsAtY();
  SvgAttributes.PointsAtX();
  SvgAttributes.Points();
  SvgAttributes.PointerEvents();
  SvgAttributes.PatternUnits();
  SvgAttributes.PatternTransform();
  SvgAttributes.PatternContentUnits();
  SvgAttributes.PathLength();
  SvgAttributes.PaintOrder();
  SvgAttributes.Overflow();
  SvgAttributes.Order();
  SvgAttributes.Operator();
  SvgAttributes.Opacity();
  SvgAttributes.NumOctaves();
  SvgAttributes.Mode();
  SvgAttributes.Min();
  SvgAttributes.Max();
  SvgAttributes.MaskUnits();
  SvgAttributes.MaskContentUnits();
  SvgAttributes.Mask();
  SvgAttributes.MarkerWidth();
  SvgAttributes.MarkerUnits();
  SvgAttributes.MarkerStart();
  SvgAttributes.MarkerMid();
  SvgAttributes.MarkerHeight();
  SvgAttributes.MarkerEnd();
  SvgAttributes.Local();
  SvgAttributes.LimitingConeAngle();
  SvgAttributes.LightingColor();
  SvgAttributes.LetterSpacing();
  SvgAttributes.KeyTimes();
  SvgAttributes.KeySplines();
  SvgAttributes.Kerning();
  SvgAttributes.KernelUnitLength();
  SvgAttributes.KernelMatrix();
  SvgAttributes.K4();
  SvgAttributes.K3();
  SvgAttributes.K2();
  SvgAttributes.K1();
  SvgAttributes.In2();
  SvgAttributes.ImageRendering();
  SvgAttributes.IN();
  SvgAttributes.Height();
  SvgAttributes.GradientUnits();
  SvgAttributes.GradientTransform();
  SvgAttributes.From();
  SvgAttributes.FontWeight();
  SvgAttributes.FontVariant();
  SvgAttributes.FontStyle();
  SvgAttributes.FontStretch();
  SvgAttributes.FontSizeAdjust();
  SvgAttributes.FontSize();
  SvgAttributes.FontFamily();
  SvgAttributes.FloodOpacity();
  SvgAttributes.FloodColor();
  SvgAttributes.FilterUnits();
  SvgAttributes.FilterRes();
  SvgAttributes.Filter();
  SvgAttributes.FillRule();
  SvgAttributes.FillOpacity();
  SvgAttributes.Fill();
  SvgAttributes.ExternalResourcesRequired();
  SvgAttributes.End();
  SvgAttributes.Elevation();
  SvgAttributes.EdgeMode();
  SvgAttributes.Dur();
  SvgAttributes.DominantBaseline();
  SvgAttributes.Divisor();
  SvgAttributes.Display();
  SvgAttributes.Direction();
  SvgAttributes.DiffuseConstant();
  SvgAttributes.DY();
  SvgAttributes.DX();
  SvgAttributes.D();
  SvgAttributes.Cursor();
  SvgAttributes.ContentStyleType();
  SvgAttributes.ContentScriptType();
  SvgAttributes.ColorRendering();
  SvgAttributes.ColorProfile();
  SvgAttributes.ColorInterpolationFilters();
  SvgAttributes.ColorInterpolation();
  SvgAttributes.Color();
  SvgAttributes.ClipRule();
  SvgAttributes.ClipPathUnits();
  SvgAttributes.ClipPath();
  SvgAttributes.Clip();
  SvgAttributes.Class();
  SvgAttributes.CalcMode();
  SvgAttributes.CY();
  SvgAttributes.CX();
  SvgAttributes.Bias();
  SvgAttributes.Begin();
  SvgAttributes.BaselineShift();
  SvgAttributes.BaseFrequency();
  SvgAttributes.Azimuth();
  SvgAttributes.AttributeType();
  SvgAttributes.AttributeName();
  SvgAttributes.Ascent();
  SvgAttributes.AlignmentBaseline();
  SvgAttributes.Additive();
  SvgAttributes.Accumulate();
  SvgAttributes.AccentHeight();
  Attributes.Wrap();
  Attributes.Width();
  Attributes.Value();
  Attributes.Usemap();
  Attributes.Type();
  Attributes.Title();
  Attributes.Target();
  Attributes.TabIndex();
  Attributes.Summary();
  Attributes.Style();
  Attributes.Step();
  Attributes.Start();
  Attributes.Srcdoc();
  Attributes.SrcLang();
  Attributes.Src();
  Attributes.Spellcheck();
  Attributes.Span();
  Attributes.Sizes();
  Attributes.Size();
  Attributes.Shape();
  Attributes.Selected();
  Attributes.Seamless();
  Attributes.Scoped();
  Attributes.Scope();
  Attributes.Sandbox();
  Attributes.Rows();
  Attributes.RowSpan();
  Attributes.Reversed();
  Attributes.Required();
  Attributes.Rel();
  Attributes.Readonly();
  Attributes.RadioGroup();
  Attributes.PubDate();
  Attributes.Preload();
  Attributes.Poster();
  Attributes.Placeholder();
  Attributes.Ping();
  Attributes.Pattern();
  Attributes.Optimum();
  Attributes.Open();
  Attributes.NoValidate();
  Attributes.Name();
  Attributes.Multiple();
  Attributes.Min();
  Attributes.Method();
  Attributes.Media();
  Attributes.MaxLength();
  Attributes.Max();
  Attributes.Manifest();
  Attributes.Low();
  Attributes.Loop();
  Attributes.List();
  Attributes.Language();
  Attributes.Lang();
  Attributes.Label();
  Attributes.Kind();
  Attributes.KeyType();
  Attributes.ItemProp();
  Attributes.IsMap();
  Attributes.Icon();
  Attributes.ID();
  Attributes.HttpEquiv();
  Attributes.HrefLang();
  Attributes.Href();
  Attributes.High();
  Attributes.Hidden();
  Attributes.Height();
  Attributes.Headers();
  Attributes.FormAction();
  Attributes.Form();
  Attributes.For();
  Attributes.EncType();
  Attributes.Dropzone();
  Attributes.Draggable();
  Attributes.Download();
  Attributes.Disabled();
  Attributes.DirName();
  Attributes.Dir();
  Attributes.Defer();
  Attributes.Default();
  Attributes.Datetime();
  Attributes.Coords();
  Attributes.Controls();
  Attributes.ContextMenu();
  Attributes.ContentEditable();
  Attributes.Content();
  Attributes.Cols();
  Attributes.Color();
  Attributes.ColSpan();
  Attributes.Codebase();
  Attributes.Code();
  Attributes.Class();
  Attributes.Cite();
  Attributes.Checked();
  Attributes.Charset();
  Attributes.Challenge();
  Attributes.Buffered();
  Attributes.Border();
  Attributes.BgColor();
  Attributes.AutoSave();
  Attributes.AutoPlay();
  Attributes.AutoFocus();
  Attributes.AutoComplete();
  Attributes.Async();
  Attributes.Alt();
  Attributes.Align();
  Attributes.Action();
  Attributes.Accesskey();
  Attributes.AcceptCharset();
  Attributes.Accept();
  Easings.CubicInOut();
  DomUtility.Doc();
  Attrs.EmptyAttr();
  Fresh.counter();
  return;
 });
}());

(function()
{
 var Global=this,Runtime=this.IntelliFactory.Runtime,WebSharper,UI,Next,Interpolation,Easing,AnimatedBobsleighSite,An,Trans,Var,Doc,List,Html,Utilities,T,Var1,View1,Attr,View,Unchecked,Samples,AnimatedContactFlow,Flow,BobsleighSite,Calculator,CheckBoxTest,Seq,Person,Site,SimpleTextBox,InputTransform,TodoList,PhoneExample,EditablePersonList,ContactFlow,MessageBoard,RoutedBobsleighSite,ObjectConstancy,MouseInfo,KeyboardInfo,Common,Fresh,String,Strings,IntrinsicFunctionProxy,Input,Keyboard,Auth,Concurrency,Server,Mouse,jQuery,DataSet,Arrays,OperatorIntrinsics,SvgElements,Math,Phone,Operators,Order,RouteMap,Builder,Router,SiteCommon,Elements,Option,Collections,MapModule,FSharpMap,Router1,SortableBarChart,parseFloat,ListModel1,Util,TodoItem,Key,Client;
 Runtime.Define(Global,{
  IntelliFactory:{
   WebSharper:{
    UI:{
     Next:{
      AnimatedBobsleighSite:{
       Fade:Runtime.Field(function()
       {
        var _arg00_45_6,_arg10_45_6,arg20;
        _arg00_45_6=Interpolation.get_Double();
        _arg10_45_6=Easing.get_CubicInOut();
        arg20=AnimatedBobsleighSite.fadeTime();
        return function(arg30)
        {
         return function(arg40)
         {
          return An.Simple(_arg00_45_6,_arg10_45_6,arg20,arg30,arg40);
         };
        };
       }),
       FadeTransition:Runtime.Field(function()
       {
        return Trans.Exit(function()
        {
         return((AnimatedBobsleighSite.Fade())(1))(0);
        },Trans.Enter(function()
        {
         return((AnimatedBobsleighSite.Fade())(0))(1);
        },Trans.Create(AnimatedBobsleighSite.Fade())));
       }),
       GlobalGo:function(_var,act)
       {
        return Var.Set(_var,act);
       },
       Governance:function()
       {
        return Doc.Concat(List.ofArray([Html.Div0(List.ofArray([Html.H10(List.ofArray([Utilities.txt("Governance")])),Html.P0(List.ofArray([Utilities.txt("The sport is overseen by the "),Utilities.href("International Bobsleigh and Skeleton Federation","http://www.fibt.com/"),Utilities.txt(", an organisation founded in 1923. The organisation governs all international competitions, acting as a body to regulate athletes' conduct, as well as providing funding for training and education.")]))]))]));
       },
       History:function()
       {
        return Doc.Concat(List.ofArray([Html.Div0(List.ofArray([Html.H10(List.ofArray([Utilities.txt("History")])),Html.P0(List.ofArray([Utilities.txt("According to "),Utilities.href("Wikipedia","http://en.wikipedia.org/wiki/Bobsleigh"),Utilities.txt(", the beginnings of bobsleigh came about due to a hotelier becoming increasingly frustrated about having entire seasons where he could not rent out his properties. In response, he got a few people interested, and the Swiss town of St Moritz became the home of the first bobsleigh races.")])),Html.P0(List.ofArray([Utilities.txt("Bobsleigh races have been a regular event at the Winter Olympics since the very first competition in 1924.")]))]))]));
       },
       HomePage:function(ctx)
       {
        return Doc.Concat(List.ofArray([Html.Div0(List.ofArray([Html.H10(List.ofArray([Utilities.txt("Welcome!")])),Html.P0(List.ofArray([Utilities.txt("Welcome to the IntelliFactory Bobsleigh MiniSite!")])),Html.P0(List.ofArray([Utilities.txt("Here you can find out about the "),Utilities.link("history",Runtime.New(T,{
         $:0
        }),function()
        {
         return ctx.Go.call(null,{
          $:1
         });
        }),Utilities.txt(" of bobsleighs, the "),Utilities.link("International Bobsleigh and Skeleton Federation",Runtime.New(T,{
         $:0
        }),function()
        {
         return ctx.Go.call(null,{
          $:2
         });
        }),Utilities.txt(", which serve as the governing body for the sport, and finally the world-famous "),Utilities.link("IntelliFactory Bobsleigh Team.",Runtime.New(T,{
         $:0
        }),function()
        {
         return ctx.Go.call(null,{
          $:3
         });
        })]))]))]));
       },
       Main:function()
       {
        var m,ctx;
        m=Var1.Create({
         $:0
        });
        ctx={
         Go:function(arg10)
         {
          return Var.Set(m,arg10);
         }
        };
        return Doc.EmbedView(View1.Map(function(pg)
        {
         return AnimatedBobsleighSite.MakePage(m,pg.$==1?AnimatedBobsleighSite.History(ctx):pg.$==2?AnimatedBobsleighSite.Governance(ctx):pg.$==3?AnimatedBobsleighSite.Team(ctx):AnimatedBobsleighSite.HomePage(ctx));
        },View1.FromVar(m)));
       },
       MakePage:function(_var,pg)
       {
        var arg30;
        arg30=function(value)
        {
         return Global.String(value);
        };
        return Doc.Concat(List.ofArray([AnimatedBobsleighSite.NavBar(_var),Html.Div(List.ofArray([Attr.AnimatedStyle("opacity",AnimatedBobsleighSite.FadeTransition(),View.Const(1),arg30)]),List.ofArray([pg]))]));
       },
       NavBar:function(_var)
       {
        var x;
        x=View1.FromVar(_var);
        return Doc.EmbedView(View1.Map(function(active)
        {
         var renderLink;
         renderLink=function(action)
         {
          return Html.LI(List.ofArray([Unchecked.Equals(action,active)?Utilities.cls("active"):Attr.get_Empty()]),List.ofArray([Utilities.link(AnimatedBobsleighSite.showAct(action),Runtime.New(T,{
           $:0
          }),function()
          {
           return AnimatedBobsleighSite.GlobalGo(_var,action);
          })]));
         };
         return Html.Nav(List.ofArray([Utilities.cls("navbar"),Utilities.cls("navbar-default"),Attr.Create("role","navigation")]),List.ofArray([Html.UL(List.ofArray([Utilities.cls("nav"),Utilities.cls("navbar-nav")]),List.ofArray([Doc.Concat(List.map(renderLink,AnimatedBobsleighSite.pages()))]))]));
        },x));
       },
       Sample:Runtime.Field(function()
       {
        return Samples.Build().Id("AnimatedBobsleighSite").FileName("AnimatedBobsleighSite.fs").Keywords(List.ofArray(["text"])).Render(function()
        {
         return AnimatedBobsleighSite.Main();
        }).RenderDescription(function()
        {
         return AnimatedBobsleighSite.description();
        }).Create();
       }),
       Team:function()
       {
        var teamMembers;
        teamMembers=List.ofArray([["Adam","granicz"],["András","AndrasJanko"],["Anton (honourary member for life)","t0yv0"],["István","inchester23"],["Loic","tarmil_"],["Sándor","sandorrakonczai"],["Simon","Simon_JF"]]);
        return Doc.Concat(List.ofArray([Html.Div0(List.ofArray([Html.H10(List.ofArray([Utilities.txt("The IntelliFactory Bobsleigh Team")])),Html.P0(List.ofArray([Utilities.txt("The world-famous IntelliFactory Bobsleigh Team was founded in 2004, and currently consists of:")])),Html.UL0(List.ofArray([Doc.Concat(List.map(Runtime.Tupled(function(tupledArg)
        {
         return Html.LI0(List.ofArray([Utilities.href(tupledArg[0],"http://www.twitter.com/"+tupledArg[1])]));
        }),teamMembers))]))]))]));
       },
       description:function()
       {
        return Html.Div0(List.ofArray([Utilities.txt("A small website about bobsleighs, demonstrating how UI.Next may be used to structure single-page applications.")]));
       },
       fadeTime:Runtime.Field(function()
       {
        return 300;
       }),
       pages:Runtime.Field(function()
       {
        return List.ofArray([{
         $:0
        },{
         $:1
        },{
         $:2
        },{
         $:3
        }]);
       }),
       showAct:function(_arg1)
       {
        return _arg1.$==1?"History":_arg1.$==2?"Governance":_arg1.$==3?"The IntelliFactory Bobsleigh Team":"Home";
       }
      },
      AnimatedContactFlow:{
       AnimateFlow:function(pg)
       {
        var arg30,arg301;
        arg30=function(value)
        {
         return Global.String(value);
        };
        arg301=function(x)
        {
         return Global.String(x)+"px";
        };
        return Html.Div(List.ofArray([Attr.Style("position","relative"),Attr.AnimatedStyle("opacity",AnimatedContactFlow.FadeTransition(),View.Const(1),arg30),Attr.AnimatedStyle("left",AnimatedContactFlow.SwipeTransition(),View.Const(0),arg301)]),List.ofArray([pg]));
       },
       Description:function()
       {
        return Html.Div0(List.ofArray([Doc.TextNode("A WS.UI.Next flowlet implementation.")]));
       },
       ExampleFlow:function()
       {
        var _builder_;
        _builder_=Flow.get_Do();
        return Flow.Embed(_builder_.Bind(AnimatedContactFlow.personFlowlet(),function(_arg1)
        {
         return _builder_.Bind(AnimatedContactFlow.contactTypeFlowlet(),function(_arg2)
         {
          return _builder_.Bind(AnimatedContactFlow.contactFlowlet(_arg2),function(_arg3)
          {
           return _builder_.ReturnFrom(Flow.Static(AnimatedContactFlow.finalPage(_arg1,_arg3)));
          });
         });
        }));
       },
       Fade:Runtime.Field(function()
       {
        var _arg00_58_11,_arg10_58_11,arg20;
        _arg00_58_11=Interpolation.get_Double();
        _arg10_58_11=Easing.get_CubicInOut();
        arg20=AnimatedContactFlow.fadeTime();
        return function(arg30)
        {
         return function(arg40)
         {
          return An.Simple(_arg00_58_11,_arg10_58_11,arg20,arg30,arg40);
         };
        };
       }),
       FadeTransition:Runtime.Field(function()
       {
        return Trans.Exit(function()
        {
         return((AnimatedContactFlow.Fade())(1))(0);
        },Trans.Enter(function()
        {
         return((AnimatedContactFlow.Fade())(0))(1);
        },Trans.Create(AnimatedContactFlow.Fade())));
       }),
       Sample:Runtime.Field(function()
       {
        return Samples.Build().Id("AnimatedContactFlow").FileName("AnimatedContactFlow.fs").Keywords(List.ofArray(["flowlet"])).Render(function()
        {
         return AnimatedContactFlow.ExampleFlow();
        }).RenderDescription(function()
        {
         return AnimatedContactFlow.Description();
        }).Create();
       }),
       Swipe:Runtime.Field(function()
       {
        var _arg00_73_9,_arg10_73_9,arg20;
        _arg00_73_9=Interpolation.get_Double();
        _arg10_73_9=Easing.get_CubicInOut();
        arg20=AnimatedContactFlow.swipeTime();
        return function(arg30)
        {
         return function(arg40)
         {
          return An.Simple(_arg00_73_9,_arg10_73_9,arg20,arg30,arg40);
         };
        };
       }),
       SwipeTransition:Runtime.Field(function()
       {
        return Trans.Exit(function()
        {
         return((AnimatedContactFlow.Swipe())(0))(400);
        },Trans.Create(AnimatedContactFlow.Swipe()));
       }),
       contactFlowlet:function(contactTy)
       {
        var patternInput,label,constr;
        patternInput=contactTy.$==1?["Phone Number",function(arg0)
        {
         return{
          $:1,
          $0:arg0
         };
        }]:["E-Mail Address",function(arg0)
        {
         return{
          $:0,
          $0:arg0
         };
        }];
        label=patternInput[0];
        constr=patternInput[1];
        return Flow.Define(function(cont)
        {
         var rvContact,arg20;
         rvContact=Var1.Create("");
         arg20=function()
         {
          return cont(constr(Var1.Get(rvContact)));
         };
         return AnimatedContactFlow.AnimateFlow(Html.Form(List.ofArray([Utilities.cls("form-horizontal"),Utilities.op_EqualsEqualsGreater("role","form")]),List.ofArray([AnimatedContactFlow.inputRow(rvContact,"contact",label),Html.Div(List.ofArray([Utilities.cls("form-group")]),List.ofArray([Html.Div(List.ofArray([Utilities.cls("col-sm-offset-2"),Utilities.cls("col-sm-10")]),List.ofArray([Doc.Button("Finish",List.ofArray([Utilities.cls("btn"),Utilities.cls("btn-default")]),arg20)]))]))])));
        });
       },
       contactTypeFlowlet:Runtime.Field(function()
       {
        return Flow.Define(function(cont)
        {
         var arg20,arg201;
         arg20=function()
         {
          return cont({
           $:0
          });
         };
         arg201=function()
         {
          return cont({
           $:1
          });
         };
         return AnimatedContactFlow.AnimateFlow(Html.Form(List.ofArray([Utilities.cls("form-horizontal"),Utilities.op_EqualsEqualsGreater("role","form")]),List.ofArray([Html.Div(List.ofArray([Utilities.cls("form-group")]),List.ofArray([Html.Div0(List.ofArray([Doc.Button("E-Mail Address",List.ofArray([Utilities.cls("btn"),Utilities.cls("btn-default")]),arg20)])),Html.Div0(List.ofArray([Doc.Button("Phone Number",List.ofArray([Utilities.cls("btn"),Utilities.cls("btn-default")]),arg201)]))]))])));
        });
       }),
       fadeTime:Runtime.Field(function()
       {
        return 300;
       }),
       finalPage:function(person,details)
       {
        var detailsStr;
        detailsStr=details.$==1?"the phone number "+details.$0:"the e-mail address "+details.$0;
        return AnimatedContactFlow.AnimateFlow(Html.Div0(List.ofArray([Doc.TextNode("You said your name was "+person.Name+", your address was "+person.Address+", "),Doc.TextNode(" and you provided "+detailsStr+".")])));
       },
       inputRow:function(rv,id,lblText)
       {
        return Html.Div(List.ofArray([Utilities.cls("form-group")]),List.ofArray([Html.Label(List.ofArray([Utilities.op_EqualsEqualsGreater("for",id),Utilities.cls("col-sm-2"),Utilities.cls("control-label")]),List.ofArray([Doc.TextNode(lblText)])),Html.Div(List.ofArray([Utilities.cls("col-sm-10")]),List.ofArray([Doc.Input(List.ofArray([Utilities.op_EqualsEqualsGreater("type","text"),Utilities.cls("form-control"),Utilities.op_EqualsEqualsGreater("id",id),Utilities.op_EqualsEqualsGreater("placeholder",lblText)]),rv)]))]));
       },
       personFlowlet:Runtime.Field(function()
       {
        return Flow.Define(function(cont)
        {
         var rvName,rvAddress,arg20;
         rvName=Var1.Create("");
         rvAddress=Var1.Create("");
         arg20=function()
         {
          return cont({
           Name:Var1.Get(rvName),
           Address:Var1.Get(rvAddress)
          });
         };
         return AnimatedContactFlow.AnimateFlow(Html.Form(List.ofArray([Utilities.cls("form-horizontal"),Utilities.op_EqualsEqualsGreater("role","form")]),List.ofArray([AnimatedContactFlow.inputRow(rvName,"lblName","Name"),AnimatedContactFlow.inputRow(rvAddress,"lblAddr","Address"),Html.Div(List.ofArray([Utilities.cls("form-group")]),List.ofArray([Html.Div(List.ofArray([Utilities.cls("col-sm-offset-2"),Utilities.cls("col-sm-10")]),List.ofArray([Doc.Button("Next",List.ofArray([Utilities.cls("btn"),Utilities.cls("btn-default")]),arg20)]))]))])));
        });
       }),
       swipeTime:Runtime.Field(function()
       {
        return 300;
       })
      },
      BobsleighSite:{
       GlobalGo:function(_var,act)
       {
        return Var.Set(_var,act);
       },
       Governance:function()
       {
        return Doc.Concat(List.ofArray([Html.Div0(List.ofArray([Html.H10(List.ofArray([Utilities.txt("Governance")])),Html.P0(List.ofArray([Utilities.txt("The sport is overseen by the "),Utilities.href("International Bobsleigh and Skeleton Federation","http://www.fibt.com/"),Utilities.txt(", an organisation founded in 1923. The organisation governs all international competitions, acting as a body to regulate athletes' conduct, as well as providing funding for training and education.")]))]))]));
       },
       History:function()
       {
        return Doc.Concat(List.ofArray([Html.Div0(List.ofArray([Html.H10(List.ofArray([Utilities.txt("History")])),Html.P0(List.ofArray([Utilities.txt("According to "),Utilities.href("Wikipedia","http://en.wikipedia.org/wiki/Bobsleigh"),Utilities.txt(", the beginnings of bobsleigh came about due to a hotelier becoming increasingly frustrated about having entire seasons where he could not rent out his properties. In response, he got a few people interested, and the Swiss town of St Moritz became the home of the first bobsleigh races.")])),Html.P0(List.ofArray([Utilities.txt("Bobsleigh races have been a regular event at the Winter Olympics since the very first competition in 1924.")]))]))]));
       },
       HomePage:function(ctx)
       {
        return Doc.Concat(List.ofArray([Html.Div0(List.ofArray([Html.H10(List.ofArray([Utilities.txt("Welcome!")])),Html.P0(List.ofArray([Utilities.txt("Welcome to the IntelliFactory Bobsleigh MiniSite!")])),Html.P0(List.ofArray([Utilities.txt("Here you can find out about the "),Utilities.link("history",Runtime.New(T,{
         $:0
        }),function()
        {
         return ctx.Go.call(null,{
          $:1
         });
        }),Utilities.txt(" of bobsleighs, the "),Utilities.link("International Bobsleigh and Skeleton Federation",Runtime.New(T,{
         $:0
        }),function()
        {
         return ctx.Go.call(null,{
          $:2
         });
        }),Utilities.txt(", which serve as the governing body for the sport, and finally the world-famous "),Utilities.link("IntelliFactory Bobsleigh Team.",Runtime.New(T,{
         $:0
        }),function()
        {
         return ctx.Go.call(null,{
          $:3
         });
        })]))]))]));
       },
       Main:function()
       {
        var m,arg00,withNavbar,ctx;
        m=Var1.Create({
         $:0
        });
        arg00=BobsleighSite.NavBar(m);
        withNavbar=function(arg10)
        {
         return Doc.Append(arg00,arg10);
        };
        ctx={
         Go:function(arg10)
         {
          return Var.Set(m,arg10);
         }
        };
        return Doc.EmbedView(View1.Map(function(pg)
        {
         return pg.$==1?withNavbar(BobsleighSite.History(ctx)):pg.$==2?withNavbar(BobsleighSite.Governance(ctx)):pg.$==3?withNavbar(BobsleighSite.Team(ctx)):withNavbar(BobsleighSite.HomePage(ctx));
        },View1.FromVar(m)));
       },
       NavBar:function(_var)
       {
        var x;
        x=View1.FromVar(_var);
        return Doc.EmbedView(View1.Map(function(active)
        {
         var renderLink;
         renderLink=function(action)
         {
          return Html.LI(List.ofArray([Unchecked.Equals(action,active)?Utilities.cls("active"):Attr.get_Empty()]),List.ofArray([Utilities.link(BobsleighSite.showAct(action),Runtime.New(T,{
           $:0
          }),function()
          {
           return BobsleighSite.GlobalGo(_var,action);
          })]));
         };
         return Html.Nav(List.ofArray([Utilities.cls("navbar"),Utilities.cls("navbar-default"),Attr.Create("role","navigation")]),List.ofArray([Html.UL(List.ofArray([Utilities.cls("nav"),Utilities.cls("navbar-nav")]),List.ofArray([Doc.Concat(List.map(renderLink,BobsleighSite.pages()))]))]));
        },x));
       },
       Sample:Runtime.Field(function()
       {
        return Samples.Build().Id("BobsleighMiniSite").FileName("BobsleighSite.fs").Keywords(List.ofArray(["text"])).Render(function()
        {
         return BobsleighSite.Main();
        }).RenderDescription(function()
        {
         return BobsleighSite.description();
        }).Create();
       }),
       Team:function()
       {
        var teamMembers;
        teamMembers=List.ofArray([["Adam","granicz"],["András","AndrasJanko"],["Anton (honourary member for life)","t0yv0"],["István","inchester23"],["Loic","tarmil_"],["Sándor","sandorrakonczai"],["Simon","Simon_JF"]]);
        return Doc.Concat(List.ofArray([Html.Div0(List.ofArray([Html.H10(List.ofArray([Utilities.txt("The IntelliFactory Bobsleigh Team")])),Html.P0(List.ofArray([Utilities.txt("The world-famous IntelliFactory Bobsleigh Team was founded in 2004, and currently consists of:")])),Html.UL0(List.ofArray([Doc.Concat(List.map(Runtime.Tupled(function(tupledArg)
        {
         return Html.LI0(List.ofArray([Utilities.href(tupledArg[0],"http://www.twitter.com/"+tupledArg[1])]));
        }),teamMembers))]))]))]));
       },
       description:function()
       {
        return Html.Div0(List.ofArray([Utilities.txt("A small website about bobsleighs, demonstrating how UI.Next may be used to structure single-page applications.")]));
       },
       pages:Runtime.Field(function()
       {
        return List.ofArray([{
         $:0
        },{
         $:1
        },{
         $:2
        },{
         $:3
        }]);
       }),
       showAct:function(_arg1)
       {
        return _arg1.$==1?"History":_arg1.$==2?"Governance":_arg1.$==3?"The IntelliFactory Bobsleigh Team":"Home";
       }
      },
      Calculator:{
       Description:function()
       {
        return Html.Div0(List.ofArray([Doc.TextNode("A calculator application")]));
       },
       Main:function()
       {
        return Calculator.calcView(Var1.Create(Calculator.initCalc()));
       },
       Sample:Runtime.Field(function()
       {
        return Samples.Build().Id("Calculator").FileName("Calculator.fs").Keywords(List.ofArray(["calculator"])).Render(function()
        {
         return Calculator.Main();
        }).RenderDescription(function()
        {
         return Calculator.Description();
        }).Create();
       }),
       cBtn:function(rvCalc)
       {
        var arg20;
        arg20=function()
        {
         return Var.Set(rvCalc,Calculator.initCalc());
        };
        return Doc.Button("C",Runtime.New(T,{
         $:0
        }),arg20);
       },
       calcBtn:function(i,rvCalc)
       {
        var arg20;
        arg20=function()
        {
         return Calculator.pushInt(i,rvCalc);
        };
        return Doc.Button(Global.String(i),Runtime.New(T,{
         $:0
        }),arg20);
       },
       calcView:function(rvCalc)
       {
        var rviCalc,btn,obtn,cbtn,eqbtn;
        rviCalc=View1.FromVar(rvCalc);
        btn=function(i)
        {
         return Calculator.calcBtn(i,rvCalc);
        };
        obtn=function(o)
        {
         return Calculator.opBtn(o,rvCalc);
        };
        cbtn=Calculator.cBtn(rvCalc);
        eqbtn=Calculator.eqBtn(rvCalc);
        return Html.Div0(List.ofArray([Doc.TextView(Calculator.displayCalc(rvCalc)),Html.Div0(List.ofArray([btn(1),btn(2),btn(3),obtn({
         $:0
        })])),Html.Div0(List.ofArray([btn(4),btn(5),btn(6),obtn({
         $:1
        })])),Html.Div0(List.ofArray([btn(7),btn(8),btn(9),obtn({
         $:2
        })])),Html.Div0(List.ofArray([btn(0),cbtn,eqbtn,obtn({
         $:3
        })]))]));
       },
       calculate:function(rvCalc)
       {
        return Var.Update(rvCalc,function(c)
        {
         return{
          Memory:0,
          Operand:((Calculator.opFn(c.Operation))(c.Memory))(c.Operand),
          Operation:{
           $:0
          }
         };
        });
       },
       displayCalc:function(rvCalc)
       {
        return View1.Map(function(c)
        {
         return Global.String(c.Operand);
        },View1.FromVar(rvCalc));
       },
       eqBtn:function(rvCalc)
       {
        var arg20;
        arg20=function()
        {
         return Calculator.calculate(rvCalc);
        };
        return Doc.Button("=",Runtime.New(T,{
         $:0
        }),arg20);
       },
       initCalc:Runtime.Field(function()
       {
        return{
         Memory:0,
         Operand:0,
         Operation:{
          $:0
         }
        };
       }),
       opBtn:function(o,rvCalc)
       {
        var arg20;
        arg20=function()
        {
         return Calculator.shiftToMem(o,rvCalc);
        };
        return Doc.Button(Calculator.showOp(o),Runtime.New(T,{
         $:0
        }),arg20);
       },
       opFn:function(op)
       {
        return op.$==1?function(x)
        {
         return function(y)
         {
          return x-y;
         };
        }:op.$==2?function(x)
        {
         return function(y)
         {
          return x*y;
         };
        }:op.$==3?function(x)
        {
         return function(y)
         {
          return x/y>>0;
         };
        }:function(x)
        {
         return function(y)
         {
          return x+y;
         };
        };
       },
       pushInt:function(x,rvCalc)
       {
        return Var.Update(rvCalc,function(c)
        {
         return{
          Memory:c.Memory,
          Operand:c.Operand*10+x,
          Operation:c.Operation
         };
        });
       },
       shiftToMem:function(op,rvCalc)
       {
        return Var.Update(rvCalc,function(c)
        {
         return{
          Memory:c.Operand,
          Operand:0,
          Operation:op
         };
        });
       },
       showOp:function(op)
       {
        return op.$==1?"-":op.$==2?"*":op.$==3?"/":"+";
       }
      },
      CheckBoxTest:{
       Description:function()
       {
        return Html.Div0(List.ofArray([Doc.TextNode("An application which shows the selected values.")]));
       },
       Main:function()
       {
        var selPeople;
        selPeople=Var1.Create(Runtime.New(T,{
         $:0
        }));
        return Doc.Concat(List.ofArray([Doc.CheckBox(function(p)
        {
         return p.Name;
        },CheckBoxTest.People(),selPeople),Doc.TextView(View1.Map(function(xs)
        {
         return Seq.fold(function(acc)
         {
          return function(p)
          {
           return acc+p.Name+", ";
          };
         },"",xs);
        },View1.FromVar(selPeople)))]));
       },
       People:Runtime.Field(function()
       {
        return List.ofArray([Person.Create("Simon",22),Person.Create("Peter",18),Person.Create("Clare",50),Person.Create("Andy",51)]);
       }),
       Person:Runtime.Class({},{
        Create:function(n,a)
        {
         return Runtime.New(Person,{
          Name:n,
          Age:a
         });
        }
       }),
       Sample:Runtime.Field(function()
       {
        return Samples.Build().Id("CheckBoxesTest").FileName("CheckBoxTest.fs").Keywords(List.ofArray(["todo"])).Render(function()
        {
         return CheckBoxTest.Main();
        }).RenderDescription(function()
        {
         return CheckBoxTest.Description();
        }).Create();
       })
      },
      Client:{
       Main:Runtime.Field(function()
       {
        return Site.Main(List.ofArray([SimpleTextBox.Sample(),InputTransform.Sample(),TodoList.Sample(),PhoneExample.Sample(),EditablePersonList.Sample(),CheckBoxTest.Sample(),Calculator.Sample(),ContactFlow.Sample(),AnimatedContactFlow.Sample(),MessageBoard.Sample(),BobsleighSite.Sample(),RoutedBobsleighSite.Sample(),AnimatedBobsleighSite.Sample(),ObjectConstancy.Sample(),MouseInfo.Sample(),KeyboardInfo.Sample()]));
       })
      },
      Common:{
       CreatePost:function(user,content)
       {
        return{
         PostId:Fresh.Int(),
         PostAuthorName:user.Name,
         Content:content
        };
       },
       CreateThread:function(author,title)
       {
        return{
         ThreadId:Fresh.Int(),
         Title:title,
         ThreadAuthorName:author,
         Posts:Var1.Create(Runtime.New(T,{
          $:0
         }))
        };
       },
       Fresh:{
        Int:function()
        {
         var _;
         _=Fresh.i()+1;
         Fresh.i=function()
         {
          return _;
         };
         return Fresh.i();
        },
        i:Runtime.Field(function()
        {
         return 0;
        })
       }
      },
      ContactFlow:{
       Description:function()
       {
        return Html.Div0(List.ofArray([Doc.TextNode("A WS.UI.Next flowlet implementation.")]));
       },
       ExampleFlow:function()
       {
        var _builder_;
        _builder_=Flow.get_Do();
        return Flow.Embed(_builder_.Bind(ContactFlow.personFlowlet(),function(_arg1)
        {
         return _builder_.Bind(ContactFlow.contactTypeFlowlet(),function(_arg2)
         {
          return _builder_.Bind(ContactFlow.contactFlowlet(_arg2),function(_arg3)
          {
           return _builder_.ReturnFrom(Flow.Static(ContactFlow.finalPage(_arg1,_arg3)));
          });
         });
        }));
       },
       Sample:Runtime.Field(function()
       {
        return Samples.Build().Id("ContactFlow").FileName("ContactFlow.fs").Keywords(List.ofArray(["flowlet"])).Render(function()
        {
         return ContactFlow.ExampleFlow();
        }).RenderDescription(function()
        {
         return ContactFlow.Description();
        }).Create();
       }),
       contactFlowlet:function(contactTy)
       {
        var patternInput,label,constr;
        patternInput=contactTy.$==1?["Phone Number",function(arg0)
        {
         return{
          $:1,
          $0:arg0
         };
        }]:["E-Mail Address",function(arg0)
        {
         return{
          $:0,
          $0:arg0
         };
        }];
        label=patternInput[0];
        constr=patternInput[1];
        return Flow.Define(function(cont)
        {
         var rvContact,arg20;
         rvContact=Var1.Create("");
         arg20=function()
         {
          return cont(constr(Var1.Get(rvContact)));
         };
         return Html.Form(List.ofArray([Utilities.cls("form-horizontal"),Utilities.op_EqualsEqualsGreater("role","form")]),List.ofArray([ContactFlow.inputRow(rvContact,"contact",label,false),Html.Div(List.ofArray([Utilities.cls("form-group")]),List.ofArray([Html.Div(List.ofArray([Utilities.cls("col-sm-offset-2"),Utilities.cls("col-sm-10")]),List.ofArray([Doc.Button("Finish",List.ofArray([Utilities.cls("btn"),Utilities.cls("btn-default")]),arg20)]))]))]));
        });
       },
       contactTypeFlowlet:Runtime.Field(function()
       {
        return Flow.Define(function(cont)
        {
         var arg20,arg201;
         arg20=function()
         {
          return cont({
           $:0
          });
         };
         arg201=function()
         {
          return cont({
           $:1
          });
         };
         return Html.Form(List.ofArray([Utilities.cls("form-horizontal"),Utilities.op_EqualsEqualsGreater("role","form")]),List.ofArray([Html.Div(List.ofArray([Utilities.cls("form-group")]),List.ofArray([Html.Div0(List.ofArray([Doc.Button("E-Mail Address",List.ofArray([Utilities.cls("btn"),Utilities.cls("btn-default")]),arg20)])),Html.Div0(List.ofArray([Doc.Button("Phone Number",List.ofArray([Utilities.cls("btn"),Utilities.cls("btn-default")]),arg201)]))]))]));
        });
       }),
       finalPage:function(person,details)
       {
        var detailsStr;
        detailsStr=details.$==1?"the phone number "+details.$0:"the e-mail address "+details.$0;
        return Html.Div0(List.ofArray([Doc.TextNode("You said your name was "+person.Name+", your address was "+person.Address+", "),Doc.TextNode(" and you provided "+detailsStr+".")]));
       },
       inputRow:function(rv,id,lblText,isArea)
       {
        var control;
        control=isArea?function(arg00)
        {
         return function(arg10)
         {
          return Doc.InputArea(arg00,arg10);
         };
        }:function(arg00)
        {
         return function(arg10)
         {
          return Doc.Input(arg00,arg10);
         };
        };
        return Html.Div(List.ofArray([Utilities.cls("row")]),List.ofArray([Html.Div(List.ofArray([Utilities.cls("form-group")]),List.ofArray([Html.Label(List.ofArray([Utilities.cls("col-sm-2"),Utilities.op_EqualsEqualsGreater("for",id),Utilities.cls("control-label")]),List.ofArray([Doc.TextNode(lblText)])),Html.Div(List.ofArray([Utilities.cls("col-sm-6")]),List.ofArray([(control(List.ofArray([Utilities.op_EqualsEqualsGreater("type","text"),Utilities.cls("form-control"),Utilities.op_EqualsEqualsGreater("id",id),Utilities.op_EqualsEqualsGreater("placeholder",lblText)])))(rv)])),Html.Div(List.ofArray([Utilities.cls("col-sm-4")]),Runtime.New(T,{
         $:0
        }))]))]));
       },
       personFlowlet:Runtime.Field(function()
       {
        return Flow.Define(function(cont)
        {
         var rvName,rvAddress,arg20;
         rvName=Var1.Create("");
         rvAddress=Var1.Create("");
         arg20=function()
         {
          return cont({
           Name:Var1.Get(rvName),
           Address:Var1.Get(rvAddress)
          });
         };
         return Html.Form(List.ofArray([Utilities.cls("form-horizontal"),Utilities.op_EqualsEqualsGreater("role","form")]),List.ofArray([ContactFlow.inputRow(rvName,"lblName","Name",false),ContactFlow.inputRow(rvAddress,"lblAddr","Address",true),Html.Div(List.ofArray([Utilities.cls("row")]),List.ofArray([Html.Div(List.ofArray([Utilities.cls("col-sm-2")]),Runtime.New(T,{
          $:0
         })),Html.Div(List.ofArray([Utilities.cls("col-sm-6")]),List.ofArray([Html.Div(List.ofArray([Utilities.cls("form-group")]),List.ofArray([Doc.Button("Next",List.ofArray([Utilities.cls("btn"),Utilities.cls("btn-default")]),arg20)]))])),Html.Div(List.ofArray([Utilities.cls("col-sm-4")]),Runtime.New(T,{
          $:0
         }))]))]));
        });
       })
      },
      EditablePersonList:{
       Description:function()
       {
        return Html.Div0(List.ofArray([Utilities.txt("An example inspired by a "),Utilities.href("SAP OpenUI sample","http://jsbin.com/openui5-HTML-templates/1/edit"),Utilities.txt(".")]));
       },
       Main:function()
       {
        return Html.Div0(List.ofArray([Html.Div0(List.ofArray([Html.H10(List.ofArray([Utilities.txt("Member List")])),EditablePersonList.memberList()])),Html.Div0(List.ofArray([Html.H10(List.ofArray([Utilities.txt("Change Member Details")])),EditablePersonList.peopleBoxes()]))]));
       },
       Sample:Runtime.Field(function()
       {
        return Samples.Build().Id("EditablePersonList").FileName("EditablePersonList.fs").Keywords(List.ofArray(["text"])).Render(function()
        {
         return EditablePersonList.Main();
        }).RenderDescription(function()
        {
         return EditablePersonList.Description();
        }).Create();
       }),
       createPerson:function(first,last)
       {
        return{
         FirstName:Var1.Create(first),
         LastName:Var1.Create(last)
        };
       },
       memberList:Runtime.Field(function()
       {
        return Html.Div0(List.ofArray([Html.UL0(List.ofArray([Doc.Concat(List.map(function(person)
        {
         return Html.LI0(List.ofArray([Doc.EmbedView(View1.Map2(function(f)
         {
          return function(l)
          {
           return Utilities.txt(f+" "+l);
          };
         },View1.FromVar(person.FirstName),View1.FromVar(person.LastName)))]));
        },EditablePersonList.peopleList()))]))]));
       }),
       peopleBoxes:Runtime.Field(function()
       {
        return Html.Div0(List.ofArray([Html.UL0(List.ofArray([Doc.Concat(List.map(function(person)
        {
         var arg10,arg101;
         arg10=person.FirstName;
         arg101=person.LastName;
         return Html.LI0(List.ofArray([Doc.Input(Runtime.New(T,{
          $:0
         }),arg10),Doc.Input(Runtime.New(T,{
          $:0
         }),arg101)]));
        },EditablePersonList.peopleList()))]))]));
       }),
       peopleList:Runtime.Field(function()
       {
        return List.ofArray([EditablePersonList.createPerson("Alonzo","Church"),EditablePersonList.createPerson("Alan","Turing"),EditablePersonList.createPerson("Bertrand","Russell"),EditablePersonList.createPerson("Noam","Chomsky")]);
       })
      },
      InputTransform:{
       Description:function()
       {
        return Html.Div0(List.ofArray([Doc.TextNode("Transforming the data provided by a single data source.")]));
       },
       Main:function()
       {
        var rvText,inputField,view,viewCaps,viewReverse,viewWordCount,viewWordCountStr,viewWordOddEven,views,tableRow;
        rvText=Var1.Create("");
        inputField=Html.Div(List.ofArray([Utilities.cls("panel"),Utilities.cls("panel-default")]),List.ofArray([Html.Div(List.ofArray([Utilities.cls("panel-heading")]),List.ofArray([Html.H3(List.ofArray([Utilities.cls("panel-title")]),List.ofArray([Doc.TextNode("Input")]))])),Html.Div(List.ofArray([Utilities.cls("panel-body")]),List.ofArray([Html.Form(List.ofArray([Utilities.cls("form-horizontal"),Utilities.op_EqualsEqualsGreater("role","form")]),List.ofArray([Html.Div(List.ofArray([Utilities.cls("form-group")]),List.ofArray([Html.Label(List.ofArray([Utilities.cls("col-sm-2"),Utilities.cls("control-label"),Utilities.op_EqualsEqualsGreater("for","inputBox")]),List.ofArray([Doc.TextNode("Write something: ")])),Html.Div(List.ofArray([Utilities.cls("col-sm-10")]),List.ofArray([Doc.Input(List.ofArray([Utilities.op_EqualsEqualsGreater("class","form-control"),Utilities.op_EqualsEqualsGreater("id","inputBox")]),rvText)]))]))]))]))]));
        view=View1.FromVar(rvText);
        viewCaps=View1.Map(function(s)
        {
         return s.toUpperCase();
        },view);
        viewReverse=View1.Map(function(s)
        {
         return String.fromCharCode.apply(undefined,Strings.ToCharArray(s).slice().reverse());
        },view);
        viewWordCount=View1.Map(function(s)
        {
         return IntrinsicFunctionProxy.GetLength(Strings.SplitChars(s,[32],1));
        },view);
        viewWordCountStr=View1.Map(function(value)
        {
         return Global.String(value);
        },viewWordCount);
        viewWordOddEven=View1.Map(function(i)
        {
         return i%2===0?"Even":"Odd";
        },viewWordCount);
        views=List.ofArray([["Entered Text",view],["Capitalised",viewCaps],["Reversed",viewReverse],["Word Count",viewWordCountStr],["Is the word count odd or even?",viewWordOddEven]]);
        tableRow=Runtime.Tupled(function(tupledArg)
        {
         var view1;
         view1=tupledArg[1];
         return Html.TR0(List.ofArray([Html.TD0(List.ofArray([Doc.TextNode(tupledArg[0])])),Html.TD(List.ofArray([Utilities.sty("width","70%")]),List.ofArray([Doc.TextView(view1)]))]));
        });
        return Html.Div0(List.ofArray([inputField,Html.Div(List.ofArray([Utilities.cls("panel"),Utilities.cls("panel-default")]),List.ofArray([Html.Div(List.ofArray([Utilities.cls("panel-heading")]),List.ofArray([Html.H3(List.ofArray([Utilities.cls("panel-title")]),List.ofArray([Doc.TextNode("Output")]))])),Html.Div(List.ofArray([Utilities.cls("panel-body")]),List.ofArray([Html.Table(List.ofArray([Utilities.cls("table")]),List.ofArray([Html.TBody0(List.ofArray([Doc.Concat(List.map(tableRow,views))]))]))]))]))]));
       },
       Sample:Runtime.Field(function()
       {
        return Samples.Build().Id("InputTransform").FileName("InputTransform.fs").Keywords(List.ofArray(["text"])).Render(function()
        {
         return InputTransform.Main();
        }).RenderDescription(function()
        {
         return InputTransform.Description();
        }).Create();
       })
      },
      KeyboardInfo:{
       Description:function()
       {
        return Html.Div0(List.ofArray([Doc.TextNode("Information about the current keyboard state")]));
       },
       Main:function()
       {
        return Html.Div0(List.ofArray([Html.P0(List.ofArray([Doc.TextNode("Keys pressed (key codes): "),Doc.TextView(View1.Map(function(xs)
        {
         return KeyboardInfo.commaList(List.map(function(value)
         {
          return Global.String(value);
         },xs));
        },KeyboardInfo.keys()))])),Html.P0(List.ofArray([Doc.TextNode("Keys pressed: "),Doc.TextView(View1.Map(function(xs)
        {
         return KeyboardInfo.commaList(List.map(function(c)
         {
          return KeyboardInfo.ToChar(c);
         },xs));
        },KeyboardInfo.keys()))])),Html.P0(List.ofArray([Doc.TextNode("Last pressed key: "),Doc.TextView(View1.Map(function(value)
        {
         return Global.String(value);
        },Keyboard.get_LastPressed()))])),Html.P0(List.ofArray([Doc.TextNode("Is 'A' pressed? "),Doc.TextView(View1.Map(function(x)
        {
         return x?"Yes":"No";
        },Keyboard.IsPressed(KeyboardInfo.ToKey("A"))))]))]));
       },
       Sample:Runtime.Field(function()
       {
        return Samples.Build().Id("KeyboardInfo").FileName("KeyboardInfo.fs").Keywords(List.ofArray(["text"])).Render(function()
        {
         return KeyboardInfo.Main();
        }).RenderDescription(function()
        {
         return KeyboardInfo.Description();
        }).Create();
       }),
       ToChar:function($c)
       {
        var $0=this,$this=this;
        return Global.String.fromCharCode($c);
       },
       ToKey:function($c)
       {
        var $0=this,$this=this;
        return $c.charCodeAt(0);
       },
       commaList:function(xs)
       {
        var addCommas;
        addCommas=function(_arg1)
        {
         var xs1;
         if(_arg1.$==1)
          {
           if(_arg1.$1.$==0)
            {
             return Global.String(_arg1.$0);
            }
           else
            {
             xs1=_arg1.$1;
             return Global.String(_arg1.$0)+", "+addCommas(xs1);
            }
          }
         else
          {
           return"";
          }
        };
        return"["+addCommas(xs)+"]";
       },
       keys:Runtime.Field(function()
       {
        return Keyboard.get_KeysPressed();
       })
      },
      MessageBoard:{
       Auth:{
        Create:function()
        {
         var loggedIn,hidden,hide,show,x,loginForm,login,logout;
         loggedIn=Var1.Create({
          $:0
         });
         hidden=Var1.Create(true);
         hide=function()
         {
          return hidden.set_Value(true);
         };
         show=function()
         {
          return hidden.set_Value(false);
         };
         x=hidden.get_View();
         loginForm=Html.Div(List.ofArray([Attr.DynamicStyle("display",View1.Map(function(yes)
         {
          return yes?"none":"block";
         },x))]),List.ofArray([Auth.LoginForm(function(user)
         {
          loggedIn.set_Value({
           $:1,
           $0:user
          });
          return hide(null);
         })]));
         login=function()
         {
          return show(null);
         };
         logout=function()
         {
          loggedIn.set_Value({
           $:0
          });
          return hide(null);
         };
         return{
          LoggedIn:loggedIn.get_View(),
          LoginForm:loginForm,
          StatusWidget:Auth.StatusWidget(login,logout,loggedIn.get_View()),
          HideForm:hide,
          ShowForm:show
         };
        },
        LoginForm:function(onLogin)
        {
         var rvUser,rvPass,rvMsg,message,inputRow,arg101;
         rvUser=Var1.Create("");
         rvPass=Var1.Create("");
         rvMsg=Var1.Create("");
         message=Html.Div0(List.ofArray([Html.P(List.ofArray([Utilities.cls("bg-danger")]),List.ofArray([Doc.TextView(rvMsg.get_View())]))]));
         inputRow=function(rv,id,lblText,isPass)
         {
          var control;
          control=isPass?function(arg00)
          {
           return function(arg10)
           {
            return Doc.PasswordBox(arg00,arg10);
           };
          }:function(arg00)
          {
           return function(arg10)
           {
            return Doc.Input(arg00,arg10);
           };
          };
          return Html.Div(List.ofArray([Utilities.cls("form-group")]),List.ofArray([Html.Label(List.ofArray([Utilities.op_EqualsEqualsGreater("for",id),Utilities.cls("col-sm-2"),Utilities.cls("control-label")]),List.ofArray([Doc.TextNode(lblText)])),Html.Div(List.ofArray([Utilities.cls("col-sm-2")]),List.ofArray([(control(List.ofArray([Utilities.cls("form-control"),Utilities.op_EqualsEqualsGreater("id",id),Utilities.op_EqualsEqualsGreater("placeholder",lblText)])))(rv)]))]));
         };
         arg101=List.ofArray([Utilities.cls("btn"),Utilities.cls("btn-primary")]);
         return Html.Div0(List.ofArray([Html.Div0(List.ofArray([Utilities.txt("Hint: TestUser/TestPass")])),message,Html.Form(List.ofArray([Utilities.cls("form-horizontal"),Utilities.op_EqualsEqualsGreater("role","form")]),List.ofArray([inputRow(rvUser,"user","Username",false),inputRow(rvPass,"pass","Password",true),Html.Div(List.ofArray([Utilities.cls("form-group")]),List.ofArray([Html.Div(List.ofArray([Utilities.cls("col-sm-offset-2"),Utilities.cls("col-sm-10")]),List.ofArray([Doc.Button("Log In",arg101,function()
         {
          return Concurrency.Start(Concurrency.Delay(function()
          {
           return Concurrency.Bind(Server.CheckLogin(rvUser.get_Value(),rvPass.get_Value()),function(arg102)
           {
            var user;
            if(arg102.$==0)
             {
              Var.Set(rvMsg,"Invalid credentials.");
              return Concurrency.Return(null);
             }
            else
             {
              user=arg102.$0;
              Var.Set(rvUser,"");
              Var.Set(rvPass,"");
              onLogin(user);
              return Concurrency.Return(null);
             }
           });
          }));
         })]))]))]))]));
        },
        StatusWidget:function(login,logout,view)
        {
         return Doc.EmbedView(View1.Map(function(_arg1)
         {
          return _arg1.$==0?Doc.Concat(List.ofArray([Html.LI0(List.ofArray([Utilities.link("You are not logged in.",Runtime.New(T,{
           $:0
          }),function()
          {
          })])),Html.LI0(List.ofArray([Utilities.link("Login",Runtime.New(T,{
           $:0
          }),login)]))])):Doc.Concat(List.ofArray([Html.LI0(List.ofArray([Utilities.link("Welcome, "+_arg1.$0.Name+"!",Runtime.New(T,{
           $:0
          }),function()
          {
          })])),Html.LI0(List.ofArray([Utilities.link("Logout",Runtime.New(T,{
           $:0
          }),logout)]))]));
         },view));
        }
       },
       Description:function()
       {
        return Html.Div0(List.ofArray([Doc.TextNode("A message board application built using MiniSitelets.")]));
       },
       Initialise:function()
       {
        var thread,post;
        thread=Common.CreateThread("SimonJF","Hello, World! This is a topic.");
        post=Common.CreatePost({
         Name:"SimonJF",
         Password:""
        },"Hello, world! This is a post.");
        return Concurrency.Start(Concurrency.Delay(function()
        {
         return Concurrency.Bind(Server.AddThread(thread),function()
         {
          return Concurrency.Bind(Server.AddPost(thread,post),function()
          {
           return Concurrency.Return(null);
          });
         });
        }));
       },
       Main:function()
       {
        var actVar,auth,Go,st,navbar;
        MessageBoard.Initialise();
        actVar=Var1.Create({
         $:2
        });
        auth=Auth.Create();
        Go=function(arg10)
        {
         return Var.Set(actVar,arg10);
        };
        st={
         Auth:auth,
         Threads:Var1.Create(Runtime.New(T,{
          $:0
         })),
         Go:Go
        };
        navbar=MessageBoard.NavBar(auth,actVar,st);
        return Doc.EmbedView(View1.Map(function(act)
        {
         auth.HideForm.call(null,null);
         return Doc.Concat(List.ofArray([navbar,auth.LoginForm,act.$==2?MessageBoard.ThreadListPage(st):act.$==1?MessageBoard.ShowThreadPage(st,act.$0):MessageBoard.NewThreadPage(st)]));
        },View1.FromVar(actVar)));
       },
       NavBar:function(auth,_var,st)
       {
        var actions,renderLink;
        actions=List.ofArray([{
         $:2
        },{
         $:0
        }]);
        renderLink=function(action)
        {
         return Doc.EmbedView(View1.Map(function(active)
         {
          return Html.LI(List.ofArray([MessageBoard.ShowAction(action)===MessageBoard.ShowAction(active)?Utilities.cls("active"):Attr.get_Empty()]),List.ofArray([Utilities.link(MessageBoard.ShowAction(action),Runtime.New(T,{
           $:0
          }),function()
          {
           return st.Go.call(null,action);
          })]));
         },View1.FromVar(_var)));
        };
        return Html.Nav(List.ofArray([Utilities.cls("navbar"),Utilities.cls("navbar-default"),Attr.Create("role","navigation")]),List.ofArray([Html.Div(List.ofArray([Utilities.cls("container-fluid")]),List.ofArray([Html.UL(List.ofArray([Utilities.cls("nav"),Utilities.cls("navbar-nav")]),List.ofArray([Doc.Concat(List.map(renderLink,actions))])),Html.UL(List.ofArray([Utilities.cls("nav"),Utilities.cls("navbar-nav"),Utilities.cls("navbar-right")]),List.ofArray([auth.StatusWidget]))]))]));
       },
       NewThreadPage:function(st)
       {
        var x;
        x=st.Auth.LoggedIn;
        return Doc.EmbedView(View1.Map(function(_arg3)
        {
         var user,rvTitle,rvPost,add;
         if(_arg3.$==0)
          {
           st.Auth.ShowForm.call(null,null);
           return Doc.get_Empty();
          }
         else
          {
           user=_arg3.$0;
           rvTitle=Var1.Create("");
           rvPost=Var1.Create("");
           add=function()
           {
            var newThread,post;
            newThread=Common.CreateThread(user.Name,Var1.Get(rvTitle));
            post=Common.CreatePost(user,Var1.Get(rvPost));
            Concurrency.Start(Concurrency.Delay(function()
            {
             return Concurrency.Bind(Server.AddThread(newThread),function()
             {
              return Concurrency.Bind(Server.AddPost(newThread,post),function()
              {
               return Concurrency.Return(null);
              });
             });
            }));
            return st.Go.call(null,{
             $:1,
             $0:newThread
            });
           };
           return Html.Div(List.ofArray([Utilities.cls("panel"),Utilities.cls("panel-default")]),List.ofArray([Html.Div(List.ofArray([Utilities.cls("panel-heading")]),List.ofArray([Html.H3(List.ofArray([Utilities.cls("panel-title")]),List.ofArray([Doc.TextNode("New Thread")]))])),Html.Div(List.ofArray([Utilities.cls("panel-body")]),List.ofArray([Html.Form(List.ofArray([Utilities.cls("form-horizontal"),Utilities.op_EqualsEqualsGreater("role","form")]),List.ofArray([Html.Div(List.ofArray([Utilities.cls("form-group")]),List.ofArray([Html.Label(List.ofArray([Utilities.op_EqualsEqualsGreater("for","threadTitle"),Utilities.cls("col-sm-2 control-label")]),List.ofArray([Doc.TextNode("Title")])),Html.Div(List.ofArray([Utilities.cls("col-sm-10")]),List.ofArray([Doc.Input(List.ofArray([Utilities.op_EqualsEqualsGreater("id","threadTitle"),Utilities.sty("width","100%"),Utilities.cls("form-control")]),rvTitle)]))])),Html.Div(List.ofArray([Utilities.cls("form-group")]),List.ofArray([Html.Label(List.ofArray([Utilities.op_EqualsEqualsGreater("for","postContent"),Utilities.cls("col-sm-2 control-label")]),List.ofArray([Doc.TextNode("Content")])),Html.Div(List.ofArray([Utilities.cls("col-sm-10")]),List.ofArray([Doc.InputArea(List.ofArray([Utilities.op_EqualsEqualsGreater("id","postContent"),Utilities.op_EqualsEqualsGreater("rows","5"),Utilities.cls("form-control"),Utilities.sty("width","100%")]),rvPost)]))])),Html.Div(List.ofArray([Utilities.cls("form-group")]),List.ofArray([Html.Div(List.ofArray([Utilities.cls("col-sm-offset-2"),Utilities.cls("col-sm-10")]),List.ofArray([Doc.Button("Submit",List.ofArray([Utilities.cls("btn"),Utilities.cls("btn-primary")]),add)]))]))]))]))]));
          }
        },x));
       },
       Sample:Runtime.Field(function()
       {
        return Samples.Build().Id("MessageBoard").FileName("MessageBoard.fs").Keywords(List.ofArray(["text"])).Render(function()
        {
         return MessageBoard.Main();
        }).RenderDescription(function()
        {
         return MessageBoard.Description();
        }).Create();
       }),
       ShowAction:function(act)
       {
        return act.$==1?"Thread "+act.$0.Title:act.$==2?"Show All Threads":"Create New Thread";
       },
       ShowThreadPage:function(st,thread)
       {
        var rvPosts,getPosts,renderPost,postList,x;
        rvPosts=Var1.Create(Runtime.New(T,{
         $:0
        }));
        getPosts=function()
        {
         return Concurrency.Start(Concurrency.Delay(function()
         {
          return Concurrency.Bind(Server.GetPosts(thread),function(arg101)
          {
           Var.Set(rvPosts,arg101);
           return Concurrency.Return(null);
          });
         }));
        };
        renderPost=function(post)
        {
         return Html.TR0(List.ofArray([Html.TD0(List.ofArray([Doc.TextNode(post.PostAuthorName)])),Html.TD0(List.ofArray([Doc.TextNode(post.Content)]))]));
        };
        postList=Html.Div(List.ofArray([Utilities.cls("panel"),Utilities.cls("panel-default")]),List.ofArray([Html.Div(List.ofArray([Utilities.cls("panel-heading")]),List.ofArray([Html.H3(List.ofArray([Utilities.cls("panel-title")]),List.ofArray([Doc.TextNode("Posts in thread \""+thread.Title+"\"")]))])),Html.Div(List.ofArray([Utilities.cls("panel-body")]),List.ofArray([Html.Table(List.ofArray([Utilities.cls("table"),Utilities.cls("table-hover")]),List.ofArray([Html.TBody0(List.ofArray([Doc.EmbedView(View1.Map(function(posts)
        {
         return Doc.Concat(List.map(renderPost,posts));
        },View1.FromVar(rvPosts)))]))]))]))]));
        getPosts(null);
        x=st.Auth.LoggedIn;
        return Html.Div0(List.ofArray([postList,Doc.EmbedView(View1.Map(function(_arg3)
        {
         var user,rvPost,add;
         if(_arg3.$==1)
          {
           user=_arg3.$0;
           rvPost=Var1.Create("");
           add=function()
           {
            var post;
            post=Common.CreatePost(user,rvPost.get_Value());
            return Concurrency.Start(Concurrency.Delay(function()
            {
             return Concurrency.Bind(Server.AddPost(thread,post),function()
             {
              getPosts(null);
              return Concurrency.Return(null);
             });
            }));
           };
           return Html.Div(List.ofArray([Utilities.cls("panel"),Utilities.cls("panel-default")]),List.ofArray([Html.Div(List.ofArray([Utilities.cls("panel-heading")]),List.ofArray([Html.H3(List.ofArray([Utilities.cls("panel-title")]),List.ofArray([Doc.TextNode("New Post")]))])),Html.Div(List.ofArray([Utilities.cls("panel-body")]),List.ofArray([Html.Form(List.ofArray([Utilities.cls("form-horizontal"),Utilities.op_EqualsEqualsGreater("role","form")]),List.ofArray([Html.Div(List.ofArray([Utilities.cls("form-group")]),List.ofArray([Html.Label(List.ofArray([Utilities.op_EqualsEqualsGreater("for","postContent"),Utilities.cls("col-sm-2 control-label")]),List.ofArray([Doc.TextNode("Content")])),Html.Div(List.ofArray([Utilities.cls("col-sm-10")]),List.ofArray([Doc.InputArea(List.ofArray([Utilities.op_EqualsEqualsGreater("id","postContent"),Utilities.op_EqualsEqualsGreater("rows","5"),Utilities.cls("form-control"),Utilities.sty("width","100%")]),rvPost)]))])),Html.Div(List.ofArray([Utilities.cls("form-group")]),List.ofArray([Html.Div(List.ofArray([Utilities.cls("col-sm-offset-2"),Utilities.cls("col-sm-10")]),List.ofArray([Doc.Button("Submit",List.ofArray([Utilities.cls("btn"),Utilities.cls("btn-primary")]),add)]))]))]))]))]));
          }
         else
          {
           return Doc.get_Empty();
          }
        },x))]));
       },
       ThreadListPage:function(st)
       {
        var renderThread,threads;
        renderThread=function(thread)
        {
         return Html.TR0(List.ofArray([Html.TD0(List.ofArray([Doc.TextNode(thread.ThreadAuthorName)])),Html.TD0(List.ofArray([Utilities.link(thread.Title,Runtime.New(T,{
          $:0
         }),function()
         {
          return st.Go.call(null,{
           $:1,
           $0:thread
          });
         })]))]));
        };
        threads=st.Threads;
        Concurrency.Start(Concurrency.Delay(function()
        {
         return Concurrency.Bind(Server.GetThreads(),function(arg101)
         {
          Var.Set(threads,arg101);
          return Concurrency.Return(null);
         });
        }));
        return Html.Table(List.ofArray([Utilities.cls("table"),Utilities.cls("table-hover")]),List.ofArray([Html.TBody0(List.ofArray([Doc.EmbedView(View1.Map(function(threads1)
        {
         return Doc.Concat(List.map(renderThread,threads1));
        },View1.FromVar(st.Threads)))]))]));
       }
      },
      MouseInfo:{
       Description:function()
       {
        return Html.Div0(List.ofArray([Doc.TextNode("Shows information about the mouse")]));
       },
       Main:function()
       {
        var arg00,arg10,xView,arg001,arg101,yView,arg002,arg102,lastClickPos,arg003,arg103,lastHeldPos;
        arg00=Runtime.Tupled(function(tuple)
        {
         return tuple[0];
        });
        arg10=Mouse.get_Position();
        xView=View1.Map(arg00,arg10);
        arg001=Runtime.Tupled(function(tuple)
        {
         return tuple[1];
        });
        arg101=Mouse.get_Position();
        yView=View1.Map(arg001,arg101);
        arg002=Mouse.get_LeftPressed();
        arg102=Mouse.get_Position();
        lastClickPos=View1.SnapshotOn(arg002,arg102);
        arg003=Mouse.get_LeftPressed();
        arg103=Mouse.get_Position();
        lastHeldPos=View1.UpdateWhile(arg003,arg103);
        return Html.Div0(List.ofArray([Html.P0(List.ofArray([Doc.TextView(View1.Map(function(x)
        {
         return"X: "+Global.String(x);
        },xView)),Doc.TextView(View1.Map(function(y)
        {
         return"Y: "+Global.String(y);
        },yView))])),Html.P0(List.ofArray([Doc.TextView(View1.Map(function(l)
        {
         return"Left button pressed: "+Global.String(l);
        },Mouse.get_LeftPressed()))])),Html.P0(List.ofArray([Doc.TextView(View1.Map(function(m)
        {
         return"Middle button pressed: "+Global.String(m);
        },Mouse.get_MiddlePressed()))])),Html.P0(List.ofArray([Doc.TextView(View1.Map(function(r)
        {
         return"Right button pressed: "+Global.String(r);
        },Mouse.get_RightPressed()))])),Html.P0(List.ofArray([Doc.TextView(View1.Map(Runtime.Tupled(function(tupledArg)
        {
         var y;
         y=tupledArg[1];
         return"Position on last left click: ("+Global.String(tupledArg[0])+","+Global.String(y)+")";
        }),lastClickPos))])),Html.P0(List.ofArray([Doc.TextView(View1.Map(Runtime.Tupled(function(tupledArg)
        {
         var y;
         y=tupledArg[1];
         return"Position of mouse while left button held: ("+Global.String(tupledArg[0])+","+Global.String(y)+")";
        }),lastHeldPos))]))]));
       },
       Sample:Runtime.Field(function()
       {
        return Samples.Build().Id("MouseInfo").FileName("MouseInfo.fs").Keywords(List.ofArray(["mouse"])).Render(function()
        {
         return MouseInfo.Main();
        }).RenderDescription(function()
        {
         return MouseInfo.Description();
        }).Create();
       })
      },
      ObjectConstancy:{
       DataSet:Runtime.Class({},{
        LoadFromCSV:function(url)
        {
         var callback;
         callback=Runtime.Tupled(function(tupledArg)
         {
          var ok;
          ok=tupledArg[0];
          jQuery.get(url,{},Runtime.Tupled(function(tupledArg1)
          {
           return ok(DataSet.ParseCSV(tupledArg1[0]));
          }));
          return;
         });
         return Concurrency.FromContinuations(function(ok)
         {
          return function(no)
          {
           return callback([ok,no,function()
           {
           }]);
          };
         });
        },
        ParseCSV:function(data)
        {
         var x,all,brackets,data1;
         x=Strings.SplitChars(data,[13,10],1);
         all=Arrays.filter(function(s)
         {
          return s!=="";
         },x);
         brackets=Arrays.map(function(arg0)
         {
          return{
           $:0,
           $0:arg0
          };
         },OperatorIntrinsics.GetArraySlice(Strings.SplitChars(all[0],[44],1),{
          $:1,
          $0:1
         },{
          $:0
         }));
         data1=Arrays.map(function(s)
         {
          return Strings.SplitChars(s,[44],1);
         },Arrays.sub(all,1,IntrinsicFunctionProxy.GetLength(all)-1));
         return Runtime.New(DataSet,{
          Brackets:brackets,
          Population:function(bracket)
          {
           return function(_arg1)
           {
            var st;
            st=_arg1.$0;
            return data1[Arrays.FindIndex(function(d)
            {
             return d[0]===st;
            },data1)][1+Arrays.FindIndex(function(y)
            {
             return Unchecked.Equals(bracket,y);
            },brackets)]<<0;
           };
          },
          States:Arrays.map(function(d)
          {
           return{
            $:0,
            $0:d[0]
           };
          },data1)
         });
        },
        Ratio:function(ds,br,st)
        {
         var total;
         total={
          $:0,
          $0:"Total"
         };
         return+(ds.Population.call(null,br))(st)/+(ds.Population.call(null,total))(st);
        },
        TopStatesByRatio:function(ds,bracket)
        {
         var x;
         x=Arrays.map(function(st)
         {
          return[st,DataSet.Ratio(ds,bracket,st)];
         },ds.States);
         return OperatorIntrinsics.GetArraySlice(Arrays.sortBy(Runtime.Tupled(function(tupledArg)
         {
          return-tupledArg[1];
         }),x),{
          $:1,
          $0:0
         },{
          $:1,
          $0:9
         });
        }
       }),
       Description:function()
       {
        return Html.Div0(List.ofArray([Utilities.txt("This sample show-cases declarative animation and interpolation (tweening)")]));
       },
       Height:Runtime.Field(function()
       {
        return 250;
       }),
       InOutTransition:Runtime.Field(function()
       {
        return Trans.Exit(function(x)
        {
         return ObjectConstancy.SimpleAnimation(x,ObjectConstancy.Height());
        },Trans.Enter(function(x)
        {
         return ObjectConstancy.SimpleAnimation(ObjectConstancy.Height(),x);
        },ObjectConstancy.SimpleTransition()));
       }),
       Main:function()
       {
        var patternInput,shownData,dataSet,bracket;
        patternInput=ObjectConstancy.SetupDataModel();
        shownData=patternInput[2];
        dataSet=patternInput[0];
        bracket=patternInput[1];
        return Html.Div0(List.ofArray([Html.H20(List.ofArray([Utilities.txt("Top States by Age Bracket, 2008")])),Doc.EmbedView(View1.Map(function(dS)
        {
         return Doc.Select(List.ofArray([Utilities.cls("form-control")]),function(_arg1)
         {
          return _arg1.$0;
         },List.ofArray(OperatorIntrinsics.GetArraySlice(dS.Brackets,{
          $:1,
          $0:1
         },{
          $:0
         })),bracket);
        },dataSet)),Html.Div(List.ofArray([Utilities.cls("skip")]),Runtime.New(T,{
         $:0
        })),SvgElements.Svg(List.ofArray([Utilities.op_EqualsEqualsGreater("width",Global.String(ObjectConstancy.Width())),Utilities.op_EqualsEqualsGreater("height",Global.String(ObjectConstancy.Height()))]),List.ofArray([Doc.EmbedView(View1.Map(function(arg00)
        {
         return Doc.Concat(arg00);
        },View1.ConvertSeqBy(function(s)
        {
         return s.State;
        },function(state)
        {
         return ObjectConstancy.Render(state);
        },shownData)))])),Html.P0(List.ofArray([Utilities.txt("Source: "),Utilities.href("Census Bureau","http://www.census.gov/popest/data/historical/2000s/vintage_2008/")])),Html.P0(List.ofArray([Utilities.txt("Original Sample by Mike Bostock: "),Utilities.href("Object Constancy","http://bost.ocks.org/mike/constancy/")]))]));
       },
       Percent:function(x)
       {
        return Global.String(Math.floor(100*x))+"."+Global.String((Math.floor(1000*x)<<0)%10)+"%";
       },
       Render:function(state)
       {
        var anim,x,y,h,txt;
        anim=function(name,kind,proj)
        {
         var arg30;
         arg30=function(value)
         {
          return Global.String(value);
         };
         return Attr.Animated(name,kind,View1.Map(proj,state),arg30);
        };
        x=function(st)
        {
         return ObjectConstancy.Width()*st.Value/st.MaxValue;
        };
        y=function(st)
        {
         return ObjectConstancy.Height()*+st.Position/+st.Total;
        };
        h=function(st)
        {
         return ObjectConstancy.Height()/+st.Total-2;
        };
        txt=function(f)
        {
         return function(attr)
         {
          return SvgElements.Text(attr,List.ofArray([Doc.TextView(View1.Map(f,state))]));
         };
        };
        return Doc.Concat(List.ofArray([SvgElements.G(List.ofArray([Attr.Style("fill","steelblue")]),List.ofArray([SvgElements.Rect(List.ofArray([Utilities.op_EqualsEqualsGreater("x","0"),anim("y",ObjectConstancy.InOutTransition(),y),anim("width",ObjectConstancy.SimpleTransition(),x),anim("height",ObjectConstancy.SimpleTransition(),h)]),Runtime.New(T,{
         $:0
        }))])),(txt(function(s)
        {
         return ObjectConstancy.Percent(s.Value);
        }))(List.ofArray([Utilities.op_EqualsEqualsGreater("text-anchor","end"),anim("x",ObjectConstancy.SimpleTransition(),x),anim("y",ObjectConstancy.InOutTransition(),y),Utilities.op_EqualsEqualsGreater("dx","-2"),Utilities.op_EqualsEqualsGreater("dy","14"),Utilities.sty("fill","white"),Utilities.sty("font","12px sans-serif")])),(txt(function(s)
        {
         return s.State;
        }))(List.ofArray([Utilities.op_EqualsEqualsGreater("x","0"),anim("y",ObjectConstancy.InOutTransition(),y),Utilities.op_EqualsEqualsGreater("dx","2"),Utilities.op_EqualsEqualsGreater("dy","16"),Utilities.sty("fill","white"),Utilities.sty("font","14px sans-serif"),Utilities.sty("font-weight","bold")]))]));
       },
       Sample:Runtime.Field(function()
       {
        return Samples.Build().Id("ObjectConstancy").FileName("ObjectConstancy.fs").Keywords(List.ofArray(["animation"])).Render(function()
        {
         return ObjectConstancy.Main();
        }).RenderDescription(function()
        {
         return ObjectConstancy.Description();
        }).Create();
       }),
       SetupDataModel:function()
       {
        var x,dataSet,bracket;
        x=View.Const(null);
        dataSet=View1.MapAsync(function()
        {
         return DataSet.LoadFromCSV("ObjectConstancy.csv");
        },x);
        bracket=Var1.Create({
         $:0,
         $0:"Under 5 Years"
        });
        return[dataSet,bracket,View1.Map(function(xs)
        {
         var n,m;
         n=IntrinsicFunctionProxy.GetLength(xs);
         m=Arrays.max(Arrays.map(Runtime.Tupled(function(tuple)
         {
          return tuple[1];
         }),xs));
         return Arrays.mapi(function(i)
         {
          return Runtime.Tupled(function(tupledArg)
          {
           return{
            MaxValue:m,
            Position:i,
            State:tupledArg[0].$0,
            Total:n,
            Value:tupledArg[1]
           };
          });
         },xs);
        },View1.Map2(function(arg00)
        {
         return function(arg10)
         {
          return DataSet.TopStatesByRatio(arg00,arg10);
         };
        },dataSet,bracket.get_View()))];
       },
       SimpleAnimation:function(x,y)
       {
        return An.Simple(Interpolation.get_Double(),Easing.get_CubicInOut(),300,x,y);
       },
       SimpleTransition:Runtime.Field(function()
       {
        return Trans.Create(function(x)
        {
         return function(y)
         {
          return ObjectConstancy.SimpleAnimation(x,y);
         };
        });
       }),
       Width:Runtime.Field(function()
       {
        return 960;
       })
      },
      PhoneExample:{
       Description:function()
       {
        return Html.Div0(List.ofArray([Doc.TextNode("Taken from the "),Utilities.href("AngularJS Tutorial","https://docs.angularjs.org/tutorial/"),Doc.TextNode(", a list filtering and sorting application for phones.")]));
       },
       Main:function()
       {
        var defPhone;
        defPhone=function(name,snip,age)
        {
         return Runtime.New(Phone,{
          Name:name,
          Snippet:snip,
          Age:age
         });
        };
        return PhoneExample.PhonesWidget(List.ofArray([defPhone("Nexus S","Fast just got faster with Nexus S.",1),defPhone("Motorola XOOM","The Next, Next generation tablet",2),defPhone("Motorola XOOM with Wi-Fi","The Next, Next generation tablet",3),defPhone("Samsung Galaxy","The Ultimate Phone",4)]));
       },
       Order:Runtime.Class({},{
        Show:function(order)
        {
         return order.$==1?"Newest":"Alphabetical";
        }
       }),
       Phone:Runtime.Class({},{
        Compare:function(order,p1,p2)
        {
         return order.$==1?Operators.Compare(p1.Age,p2.Age):Operators.Compare(p1.Name,p2.Name);
        },
        MatchesQuery:function(q,ph)
        {
         return ph.Name.indexOf(q)!=-1?true:ph.Snippet.indexOf(q)!=-1;
        }
       }),
       PhonesWidget:function(phones)
       {
        var allPhones,query,order,arg00,arg101,arg201,visiblePhones,showPhone,showPhones;
        allPhones=Var1.Create(phones);
        query=Var1.Create("");
        order=Var1.Create(Runtime.New(Order,{
         $:1
        }));
        arg00=function(query1)
        {
         return function(order1)
         {
          return List.sortWith(function(arg10)
          {
           return function(arg20)
           {
            return Phone.Compare(order1,arg10,arg20);
           };
          },List.filter(function(arg10)
          {
           return Phone.MatchesQuery(query1,arg10);
          },phones));
         };
        };
        arg101=View1.FromVar(query);
        arg201=View1.FromVar(order);
        visiblePhones=View1.Map2(arg00,arg101,arg201);
        showPhone=function(ph)
        {
         return Html.LI0(List.ofArray([Html.Span0(List.ofArray([Utilities.txt(ph.Name)])),Html.P0(List.ofArray([Utilities.txt(ph.Snippet)]))]));
        };
        showPhones=function(phones1)
        {
         return Doc.Concat(List.map(showPhone,phones1));
        };
        return Html.Div(List.ofArray([Utilities.cls("row")]),List.ofArray([Html.Div(List.ofArray([Utilities.cls("col-sm-6")]),List.ofArray([Utilities.txt("Search: "),Doc.Input(List.ofArray([Attr.Create("class","form-control")]),query),Utilities.txt("Sort by: "),Doc.Select(List.ofArray([Attr.Create("class","form-control")]),function(arg001)
        {
         return Order.Show(arg001);
        },List.ofArray([Runtime.New(Order,{
         $:1
        }),Runtime.New(Order,{
         $:0
        })]),order)])),Html.Div(List.ofArray([Utilities.cls("col-sm-6")]),List.ofArray([Html.UL0(List.ofArray([Doc.EmbedView(View1.Map(showPhones,visiblePhones))]))]))]));
       },
       Sample:Runtime.Field(function()
       {
        return Samples.Build().Id("PhoneExample").FileName("PhoneExample.fs").Keywords(List.ofArray(["todo"])).Render(function()
        {
         return PhoneExample.Main();
        }).RenderDescription(function()
        {
         return PhoneExample.Description();
        }).Create();
       })
      },
      RoutedBobsleighSite:{
       Main:function(current)
       {
        var arg00,withNavbar,ctx;
        arg00=BobsleighSite.NavBar(current);
        withNavbar=function(arg10)
        {
         return Doc.Append(arg00,arg10);
        };
        ctx={
         Go:function(arg10)
         {
          return Var.Set(current,arg10);
         }
        };
        return Doc.EmbedView(View1.Map(function(pg)
        {
         return pg.$==1?withNavbar(BobsleighSite.History(ctx)):pg.$==2?withNavbar(BobsleighSite.Governance(ctx)):pg.$==3?withNavbar(BobsleighSite.Team(ctx)):withNavbar(BobsleighSite.HomePage(ctx));
        },View1.FromVar(current)));
       },
       Sample:Runtime.Field(function()
       {
        return Samples.Routed(RoutedBobsleighSite.TheRouteMap(),{
         $:0
        }).Id("RoutedBobsleighMiniSite").FileName("RoutedBobsleighSite.fs").Keywords(List.ofArray(["text"])).Render(function(current)
        {
         return RoutedBobsleighSite.Main(current);
        }).RenderDescription(function(v)
        {
         return RoutedBobsleighSite.description(v);
        }).Create();
       }),
       TheRouteMap:Runtime.Field(function()
       {
        return RouteMap.Create(function(_arg1)
        {
         return _arg1.$==1?List.ofArray(["history"]):_arg1.$==2?List.ofArray(["governance"]):_arg1.$==3?List.ofArray(["team"]):Runtime.New(T,{
          $:0
         });
        },function(_arg2)
        {
         return _arg2.$==1?_arg2.$0==="history"?_arg2.$1.$==0?{
          $:1
         }:{
          $:0
         }:_arg2.$0==="governance"?_arg2.$1.$==0?{
          $:2
         }:{
          $:0
         }:_arg2.$0==="team"?_arg2.$1.$==0?{
          $:3
         }:{
          $:0
         }:{
          $:0
         }:{
          $:0
         };
        });
       }),
       description:function()
       {
        return Html.Div0(List.ofArray([Utilities.txt("A small website about bobsleighs, demonstrating how UI.Next may be used to structure single-page applications. Routed using the URL.")]));
       }
      },
      Samples:{
       Build:function()
       {
        return Builder.New(function(vis)
        {
         return function(meta)
         {
          return Samples.CreateSimple(vis,meta);
         };
        });
       },
       Builder:Runtime.Class({
        Create:function()
        {
         return(this.create.call(null,this.vis))(this.meta);
        },
        FileName:function(x)
        {
         var inputRecord;
         inputRecord=this.meta;
         this.meta={
          FileName:x,
          Keywords:inputRecord.Keywords,
          Title:inputRecord.Title,
          Uri:inputRecord.Uri
         };
         return this;
        },
        Id:function(x)
        {
         var inputRecord;
         inputRecord=this.meta;
         this.meta={
          FileName:inputRecord.FileName,
          Keywords:inputRecord.Keywords,
          Title:x,
          Uri:x
         };
         return this;
        },
        Keywords:function(x)
        {
         var inputRecord;
         inputRecord=this.meta;
         this.meta={
          FileName:inputRecord.FileName,
          Keywords:x,
          Title:inputRecord.Title,
          Uri:inputRecord.Uri
         };
         return this;
        },
        Render:function(f)
        {
         this.vis={
          Desc:this.vis.Desc,
          Main:f
         };
         return this;
        },
        RenderDescription:function(x)
        {
         this.vis={
          Desc:x,
          Main:this.vis.Main
         };
         return this;
        },
        Title:function(x)
        {
         var inputRecord;
         inputRecord=this.meta;
         this.meta={
          FileName:inputRecord.FileName,
          Keywords:inputRecord.Keywords,
          Title:x,
          Uri:inputRecord.Uri
         };
         return this;
        },
        Uri:function(x)
        {
         var inputRecord;
         inputRecord=this.meta;
         this.meta={
          FileName:inputRecord.FileName,
          Keywords:inputRecord.Keywords,
          Title:inputRecord.Title,
          Uri:x
         };
         return this;
        }
       },{
        New:function(create)
        {
         var r;
         r=Runtime.New(this,{});
         r.create=create;
         r.meta={
          FileName:"Unknown.fs",
          Keywords:Runtime.New(T,{
           $:0
          }),
          Title:"Unknown",
          Uri:"unknown"
         };
         r.vis={
          Desc:function()
          {
           return Doc.get_Empty();
          },
          Main:function()
          {
           return Doc.get_Empty();
          }
         };
         return r;
        }
       }),
       CreateRouted:function(router,init,vis,meta)
       {
        var sample;
        sample={
         Body:Doc.get_Empty(),
         Description:Doc.get_Empty(),
         Meta:meta,
         Router:undefined,
         RouteId:undefined,
         SamplePage:undefined
        };
        sample.Router=Router.Prefix(meta.Uri,Router.Route(router,init,function(id)
        {
         return function(cur)
         {
          var page;
          sample.RouteId=id;
          sample.Body=vis.Main.call(null,cur);
          sample.Description=vis.Desc.call(null,cur);
          page=SiteCommon.mkPage(sample.Meta.Title,id,{
           $:2
          });
          page.PageSample={
           $:1,
           $0:sample
          };
          page.PageRouteId=id;
          sample.SamplePage=page;
          return page;
         };
        }));
        return sample;
       },
       CreateSimple:function(vis,meta)
       {
        var unitRouter,sample;
        unitRouter=RouteMap.Create(function()
        {
         return Runtime.New(T,{
          $:0
         });
        },function()
        {
         return null;
        });
        sample={
         Body:vis.Main.call(null,null),
         Description:vis.Desc.call(null,null),
         Meta:meta,
         Router:undefined,
         RouteId:undefined,
         SamplePage:undefined
        };
        sample.Router=Router.Prefix(meta.Uri,Router.Route(unitRouter,null,function(id)
        {
         return function()
         {
          var page;
          page=SiteCommon.mkPage(sample.Meta.Title,id,{
           $:2
          });
          sample.RouteId=id;
          page.PageSample={
           $:1,
           $0:sample
          };
          page.PageRouteId=id;
          sample.SamplePage=page;
          return page;
         };
        }));
        return sample;
       },
       InitialSamplePage:function(samples)
       {
        return samples.$0.SamplePage;
       },
       Render:function(vPage,pg,samples)
       {
        var matchValue,sample;
        matchValue=pg.PageSample;
        sample=matchValue.$==0?Operators.FailWith("Attempted to render non-sample on samples page"):matchValue.$0;
        return Elements.Section(List.ofArray([Utilities.cls("block-small")]),List.ofArray([Html.Div(List.ofArray([Utilities.cls("container")]),List.ofArray([Html.Div(List.ofArray([Utilities.cls("row")]),List.ofArray([Samples.Sidebar(vPage,samples),Samples.RenderContent(sample)]))]))]));
       },
       RenderContent:function(sample)
       {
        return Html.Div(List.ofArray([Utilities.cls("samples"),Utilities.cls("col-9")]),List.ofArray([Html.Div0(List.ofArray([Html.Div(List.ofArray([Utilities.cls("row")]),List.ofArray([Html.H10(List.ofArray([Utilities.txt(sample.Meta.Title)])),Html.Div0(List.ofArray([Html.P0(List.ofArray([sample.Description])),Html.P0(List.ofArray([Elements.A(List.ofArray([Utilities.op_EqualsEqualsGreater("href","https://github.com/intellifactory/websharper.ui.next/blob/master/src/"+sample.Meta.Uri+".fs")]),List.ofArray([Utilities.txt("View Source")]))]))]))])),Html.Div(List.ofArray([Utilities.cls("row")]),List.ofArray([Html.P0(List.ofArray([sample.Body]))]))]))]));
       },
       Routed:function(router,init)
       {
        return Builder.New(function(vis)
        {
         return function(meta)
         {
          return Samples.CreateRouted(router,init,vis,meta);
         };
        });
       },
       SamplesRouter:function(samples)
       {
        return Router.Prefix("samples",Router.Merge(Seq.toList(Seq.delay(function()
        {
         return Seq.map(function(s)
         {
          return s.Router;
         },samples);
        }))));
       },
       Sidebar:function(vPage,samples)
       {
        var renderItem;
        renderItem=function(sample)
        {
         var arg20,activeAttr,arg201;
         arg20=function(s)
         {
          return Option.exists(function(smp)
          {
           return sample.Meta.FileName===smp.Meta.FileName;
          },s);
         };
         activeAttr=Attr.DynamicClass("active",View1.Map(function(pg)
         {
          return pg.PageSample;
         },View1.FromVar(vPage)),arg20);
         arg201=function()
         {
          return Var.Set(vPage,sample.SamplePage);
         };
         return Doc.Link(sample.Meta.Title,List.ofArray([Utilities.cls("list-group-item"),activeAttr]),arg201);
        };
        return Html.Div(List.ofArray([Utilities.cls("col-3")]),List.ofArray([Html.H40(List.ofArray([Utilities.txt("Samples")])),Doc.Concat(List.map(renderItem,samples))]));
       },
       nav:Runtime.Field(function()
       {
        return function(ats)
        {
         return function(ch)
         {
          return Elements.Nav(ats,ch);
         };
        };
       })
      },
      Server:{
       AddPost:function(thread,post)
       {
        return Concurrency.Delay(function()
        {
         var matchValue,k,v,_,k1,v1,_1;
         matchValue=MapModule.TryFind(thread.ThreadId,Server.posts());
         if(matchValue.$==0)
          {
           k=thread.ThreadId;
           v=List.ofArray([post]);
           _=Server.posts().Add(k,v);
           Server.posts=function()
           {
            return _;
           };
           return Concurrency.Return(null);
          }
         else
          {
           k1=thread.ThreadId;
           v1=List.append(matchValue.$0,List.ofArray([post]));
           _1=Server.posts().Add(k1,v1);
           Server.posts=function()
           {
            return _1;
           };
           return Concurrency.Return(null);
          }
        });
       },
       AddThread:function(thread)
       {
        return Concurrency.Delay(function()
        {
         var _,k,v,_1;
         _=List.append(Server.threads(),List.ofArray([thread]));
         Server.threads=function()
         {
          return _;
         };
         k=thread.ThreadId;
         v=Runtime.New(T,{
          $:0
         });
         _1=Server.posts().Add(k,v);
         Server.posts=function()
         {
          return _1;
         };
         return Concurrency.Return(null);
        });
       },
       CheckCredentials:function(name,pass)
       {
        var matchValue;
        matchValue=[name,pass];
        return matchValue[0]==="TestUser"?matchValue[1]==="TestPass"?{
         $:1,
         $0:{
          Name:name,
          Password:pass
         }
        }:{
         $:0
        }:{
         $:0
        };
       },
       CheckLogin:function(user,pass)
       {
        return Concurrency.Delay(function()
        {
         return Concurrency.Bind(Concurrency.Sleep(Server.DELAY()),function()
         {
          return Concurrency.Return(Server.CheckCredentials(user,pass));
         });
        });
       },
       DELAY:Runtime.Field(function()
       {
        return 200;
       }),
       GetPosts:function(thread)
       {
        return Concurrency.Delay(function()
        {
         var matchValue;
         matchValue=MapModule.TryFind(thread.ThreadId,Server.posts());
         return matchValue.$==0?Concurrency.Return(Runtime.New(T,{
          $:0
         })):Concurrency.Return(matchValue.$0);
        });
       },
       GetThreads:function()
       {
        return Concurrency.Delay(function()
        {
         return Concurrency.Bind(Concurrency.Sleep(Server.DELAY()),function()
         {
          return Concurrency.Return(Server.threads());
         });
        });
       },
       posts:Runtime.Field(function()
       {
        return FSharpMap.New([]);
       }),
       threads:Runtime.Field(function()
       {
        return Runtime.New(T,{
         $:0
        });
       })
      },
      SimpleTextBox:{
       Description:function()
       {
        return Html.Div0(List.ofArray([Doc.TextNode("A label which copies the contents of a text box.")]));
       },
       Main:function()
       {
        var rvText,inputField,label;
        rvText=Var1.Create("");
        inputField=Doc.Input(List.ofArray([Attr.Create("class","form-control")]),rvText);
        label=Doc.TextView(rvText.get_View());
        return Utilities.divc("panel-default",List.ofArray([Utilities.divc("panel-body",List.ofArray([Html.Div0(List.ofArray([inputField])),Html.Div0(List.ofArray([label]))]))]));
       },
       Sample:Runtime.Field(function()
       {
        return Samples.Build().Id("SimpleTextBox").FileName("SimpleTextBox.fs").Keywords(List.ofArray(["text"])).Render(function()
        {
         return SimpleTextBox.Main();
        }).RenderDescription(function()
        {
         return SimpleTextBox.Description();
        }).Create();
       })
      },
      Site:{
       AboutPage:function(go)
       {
        var renderBody,oddEntry,evenEntry,ico,arg20;
        renderBody=function(entry)
        {
         return Doc.Concat(List.ofArray([Html.H10(List.ofArray([Utilities.txt(entry.Name)])),Html.P(List.ofArray([Utilities.cls("lead")]),List.ofArray([Utilities.txt(entry.Description)])),Html.P0(List.ofArray([Html.UL(List.ofArray([Utilities.cls("list-unstyled")]),List.ofArray([Doc.Concat(List.map(function(lnk)
         {
          return Html.LI0(List.ofArray([lnk]));
         },entry.URLs))]))]))]));
        };
        oddEntry=function(entry)
        {
         return Elements.Section(List.ofArray([Utilities.cls("block-large")]),List.ofArray([Html.Div(List.ofArray([Utilities.cls("container")]),List.ofArray([Html.Div(List.ofArray([Utilities.cls("row")]),List.ofArray([Html.Div(List.ofArray([Utilities.cls("col-lg-3")]),List.ofArray([Elements.Img(List.ofArray([Utilities.op_EqualsEqualsGreater("src",entry.ImgURL),Utilities.sty("width","100%")]),Runtime.New(T,{
          $:0
         }))])),Html.Div(List.ofArray([Utilities.cls("col-lg-1")]),Runtime.New(T,{
          $:0
         })),Html.Div(List.ofArray([Utilities.cls("col-lg-8")]),List.ofArray([renderBody(entry)]))]))]))]));
        };
        evenEntry=function(entry)
        {
         return Elements.Section(List.ofArray([Utilities.cls("block-large"),Utilities.cls("bg-alt")]),List.ofArray([Html.Div(List.ofArray([Utilities.cls("container")]),List.ofArray([Html.Div(List.ofArray([Utilities.cls("row")]),List.ofArray([Html.Div(List.ofArray([Utilities.cls("col-lg-8")]),List.ofArray([renderBody(entry)])),Html.Div(List.ofArray([Utilities.cls("col-lg-1")]),Runtime.New(T,{
          $:0
         })),Html.Div(List.ofArray([Utilities.cls("col-lg-3")]),List.ofArray([Elements.Img(List.ofArray([Utilities.op_EqualsEqualsGreater("src",entry.ImgURL),Utilities.sty("width","100%")]),Runtime.New(T,{
          $:0
         }))]))]))]))]));
        };
        ico=function(name)
        {
         return Html.Span(List.ofArray([Utilities.cls("fa"),Utilities.cls(name),Utilities.cls("fa-3x"),Utilities.sty("font-size","400%"),Utilities.sty("color","#aaa")]),Runtime.New(T,{
          $:0
         }));
        };
        arg20=function()
        {
         return go({
          $:2
         });
        };
        return Html.Div(List.ofArray([Utilities.cls("extensions")]),List.ofArray([Html.Div(List.ofArray([Utilities.cls("container")]),List.ofArray([Elements.Section(List.ofArray([Utilities.cls("block-huge")]),List.ofArray([Html.H10(List.ofArray([Utilities.txt("WebSharper UI.Next: "),Html.Span(List.ofArray([Utilities.cls("text-muted")]),List.ofArray([Utilities.txt("Everything you need to know.")]))])),Html.P(List.ofArray([Utilities.cls("lead")]),List.ofArray([Utilities.txt("A selection of resources about UI.Next.")]))]))])),Html.Div(List.ofArray([Utilities.cls("block-large"),Utilities.cls("bg-alt")]),List.ofArray([Html.Div(List.ofArray([Utilities.cls("container")]),List.ofArray([Html.Div(List.ofArray([Utilities.cls("row"),Utilities.cls("text-center")]),List.ofArray([Html.Div(List.ofArray([Utilities.cls("col-lg-4")]),List.ofArray([ico("fa-graduation-cap"),Html.H30(List.ofArray([Utilities.txt("Get Started")])),Html.P0(List.ofArray([Utilities.txt("Take the tutorial, and you'll be writing reactive applications in no time!")])),Site.linkBtn("Tutorial","https://github.com/intellifactory/websharper.ui.next/blob/master/docs/Tutorial.md")])),Html.Div(List.ofArray([Utilities.cls("col-lg-4")]),List.ofArray([ico("fa-book"),Html.H30(List.ofArray([Utilities.txt("Dive Right In")])),Html.P0(List.ofArray([Utilities.txt("Comprehensive documentation on the UI.Next API.")])),Site.linkBtn("API Reference","https://github.com/intellifactory/websharper.ui.next/blob/master/docs/API.md")])),Html.Div(List.ofArray([Utilities.cls("col-lg-4")]),List.ofArray([ico("fa-send"),Html.H30(List.ofArray([Utilities.txt("See it in Action")])),Html.P0(List.ofArray([Utilities.txt("A variety of samples using UI.Next, and their associated source code!")])),Doc.Button("Samples",List.ofArray([Utilities.cls("btn"),Utilities.cls("btn-default")]),arg20)]))]))]))])),Doc.Concat(List.mapi(function(i)
        {
         return function(entry)
         {
          return(i%2===0?oddEntry:evenEntry)(entry);
         };
        },Site.Entries()))]));
       },
       Entries:Runtime.Field(function()
       {
        return List.ofArray([Site.mkEntry("Documentation","Official documentation on WebSharper UI.Next, including the API reference and some discussion about the design decisions we made","files/gear.png",List.ofArray([Utilities.href("Tutorial","https://github.com/intellifactory/websharper.ui.next/blob/master/docs/Tutorial.md"),Utilities.href("API Reference","https://github.com/intellifactory/websharper.ui.next/blob/master/docs/API.md"),Utilities.href("Full Documentation","https://github.com/intellifactory/websharper.ui.next/blob/master/README.md")])),Site.mkEntry("Articles","Articles written about UI.Next, which provide more detailed discussions about various aspects of the library.","files/uinext-screen.png",List.ofArray([Utilities.href("WebSharper UI.Next: An Introduction","http://www.websharper.com/blog-entry/3954"),Utilities.href("WebSharper UI.Next: Declarative Animation","http://www.websharper.com/blog-entry/3964"),Utilities.href("Structuring Applications with WebSharper UI.Next","http://www.websharper.com/blog-entry/3965")])),Site.mkEntry("Presentations","Presentations about UI.Next, providing an overview of the library and deeper insights into the thinking behind it.","files/anton-pres.png",List.ofArray([Utilities.href("Presentation: Tackle UI with Reactive DOM in F# and WebSharper","https://www.youtube.com/watch?v=wEkS09s3KBc")]))]);
       }),
       Fade:Runtime.Field(function()
       {
        var _arg00_312_13,_arg10_312_13,arg20;
        _arg00_312_13=Interpolation.get_Double();
        _arg10_312_13=Easing.get_CubicInOut();
        arg20=Site.fadeTime();
        return function(arg30)
        {
         return function(arg40)
         {
          return An.Simple(_arg00_312_13,_arg10_312_13,arg20,arg30,arg40);
         };
        };
       }),
       FadeTransition:Runtime.Field(function()
       {
        return Trans.Exit(function()
        {
         return((Site.Fade())(1))(0);
        },Trans.Enter(function()
        {
         return((Site.Fade())(0))(1);
        },Trans.Create(Site.Fade())));
       }),
       HomePage:function()
       {
        return Html.Div(List.ofArray([Utilities.cls("container")]),List.ofArray([Elements.Section(List.ofArray([Utilities.cls("block-huge"),Utilities.cls("teaser-home"),Utilities.sty("height","700px"),Utilities.sty("padding-top","40px"),Utilities.sty("padding-bottom","30px"),Utilities.sty("margin-bottom","40px")]),List.ofArray([Html.Div(List.ofArray([Utilities.cls("container")]),List.ofArray([Html.Div(List.ofArray([Utilities.cls("row")]),List.ofArray([Html.Div(List.ofArray([Utilities.cls("col-12")]),List.ofArray([Elements.Br(Runtime.New(T,{
         $:0
        }),Runtime.New(T,{
         $:0
        })),Html.H10(List.ofArray([Utilities.txt("WebSharper UI.Next: "),Html.Span(List.ofArray([Utilities.cls("text-muted")]),List.ofArray([Utilities.txt("A new generation of reactive web applications.")]))])),Html.H30(List.ofArray([Utilities.txt("Write powerful, data-backed applications"),Elements.Br(Runtime.New(T,{
         $:0
        }),Runtime.New(T,{
         $:0
        })),Utilities.txt(" using F# and WebSharper.")])),Html.P(List.ofArray([Utilities.cls("lead")]),List.ofArray([Utilities.txt("Get it free on NuGet today!")]))]))]))]))]))]));
       },
       Main:function(samples)
       {
        var arg00,arg10,router;
        arg00=function(pg)
        {
         return pg.PageRouteId;
        };
        arg10=Site.SiteRouter(samples);
        router=Router1.Install(arg00,arg10);
        Doc.RunById("main",Doc.EmbedView(View1.Map(function(pg)
        {
         var matchValue;
         matchValue=pg.PageType;
         return matchValue.$==1?Site.AboutPage(function(ty)
         {
          return Var.Set(router,Site.pageFor(ty,samples));
         }):matchValue.$==2?Samples.Render(router,pg,samples):Site.HomePage(function(ty)
         {
          return Var.Set(router,Site.pageFor(ty,samples));
         });
        },View1.FromVar(router))));
        return Doc.RunById("navigation",Site.NavBar(router,samples));
       },
       MakePage:function(pg)
       {
        var arg30;
        arg30=function(value)
        {
         return Global.String(value);
        };
        return Html.Div(List.ofArray([Attr.AnimatedStyle("opacity",Site.FadeTransition(),View.Const(1),arg30)]),List.ofArray([pg]));
       },
       NavBar:function(v,samples)
       {
        var renderLink,renderExternal;
        renderLink=function(pg)
        {
         return Doc.EmbedView(View1.Map(function(page)
         {
          var liAttr;
          liAttr=Unchecked.Equals(page.PageType,pg)?Attr.Class("active"):Attr.get_Empty();
          return Html.LI(List.ofArray([Utilities.cls("nav-item"),liAttr]),List.ofArray([Utilities.link(Site.showPgTy(pg),Runtime.New(T,{
           $:0
          }),function()
          {
           return Var.Set(v,Site.pageFor(pg,samples));
          })]));
         },View1.FromVar(v)));
        };
        renderExternal=Runtime.Tupled(function(tupledArg)
        {
         var title,lnk;
         title=tupledArg[0];
         lnk=tupledArg[1];
         return Html.LI(List.ofArray([Utilities.cls("nav-item")]),List.ofArray([Utilities.href(title,lnk)]));
        });
        return Elements.Nav(List.ofArray([Utilities.cls("container")]),List.ofArray([Html.Div(List.ofArray([Utilities.sty("float","left")]),List.ofArray([Html.A(List.ofArray([Utilities.op_EqualsEqualsGreater("href","http://www.websharper.com/home"),Utilities.sty("text-decoration","none"),Utilities.cls("first")]),List.ofArray([Elements.Img(List.ofArray([Utilities.op_EqualsEqualsGreater("src","files/logo-websharper-icon.png"),Utilities.op_EqualsEqualsGreater("alt","[logo]"),Utilities.sty("margin-top","0"),Utilities.sty("border-right","1px"),Utilities.sty("solid","#eee")]),Runtime.New(T,{
         $:0
        })),Elements.Img(List.ofArray([Utilities.op_EqualsEqualsGreater("src","files/logo-websharper-text-dark.png"),Utilities.op_EqualsEqualsGreater("alt","WebSharper"),Utilities.sty("height","32px")]),Runtime.New(T,{
         $:0
        }))]))])),Elements.Nav(List.ofArray([Utilities.cls("nav"),Utilities.cls("nav-collapsible"),Utilities.cls("right"),Utilities.sty("float","right")]),List.ofArray([Html.UL(List.ofArray([Utilities.cls("nav-list")]),List.ofArray([Doc.Concat(List.map(renderLink,Site.NavPages())),Doc.Concat(List.map(renderExternal,Site.NavExternalLinks()))]))]))]));
       },
       NavExternalLinks:Runtime.Field(function()
       {
        return List.ofArray([["GitHub","http://www.github.com/IntelliFactory/websharper.ui.next"],["API Reference","https://github.com/intellifactory/websharper.ui.next/blob/master/docs/API.md"]]);
       }),
       NavPages:Runtime.Field(function()
       {
        return List.ofArray([{
         $:0
        },{
         $:1
        },{
         $:2
        }]);
       }),
       SiteRouter:function(samples)
       {
        return Router.Merge(List.ofArray([Router.Prefix("home",Site.homeRouter(samples)),Router.Prefix("about",Site.aboutRouter(samples)),Router.Prefix("samples",Samples.SamplesRouter(samples))]));
       },
       aboutPage:Runtime.Field(function()
       {
        return SiteCommon.mkPage(Site.showPgTy({
         $:1
        }),undefined,{
         $:1
        });
       }),
       aboutRouter:function(samples)
       {
        var arg20;
        arg20=function(id)
        {
         return function()
         {
          var aboutPg;
          aboutPg=Site.pageFor({
           $:1
          },samples);
          aboutPg.PageRouteId=id;
          return aboutPg;
         };
        };
        return Router.Route(Site.unitRouteMap(),null,arg20);
       },
       fadeTime:Runtime.Field(function()
       {
        return 300;
       }),
       homePage:Runtime.Field(function()
       {
        return SiteCommon.mkPage(Site.showPgTy({
         $:0
        }),undefined,{
         $:0
        });
       }),
       homeRouter:function(samples)
       {
        var arg20;
        arg20=function(id)
        {
         return function()
         {
          var homePg;
          homePg=Site.pageFor({
           $:0
          },samples);
          homePg.PageRouteId=id;
          return homePg;
         };
        };
        return Router.Route(Site.unitRouteMap(),null,arg20);
       },
       linkBtn:function(caption,href)
       {
        return Elements.A(List.ofArray([Utilities.cls("btn"),Utilities.cls("btn-default"),Utilities.op_EqualsEqualsGreater("href",href)]),List.ofArray([Utilities.txt(caption)]));
       },
       mkEntry:function(name,desc,img,urls)
       {
        return{
         Name:name,
         ImgURL:img,
         Description:desc,
         URLs:urls
        };
       },
       pageFor:function(pty,samples)
       {
        return pty.$==1?Site.aboutPage():pty.$==2?Samples.InitialSamplePage(samples):Site.homePage();
       },
       showPgTy:function(_arg1)
       {
        return _arg1.$==1?"About":_arg1.$==2?"Samples":"Home";
       },
       unitRouteMap:Runtime.Field(function()
       {
        return RouteMap.Create(function()
        {
         return Runtime.New(T,{
          $:0
         });
        },function()
        {
         return null;
        });
       })
      },
      SiteCommon:{
       mkPage:function(name,routeId,ty)
       {
        return{
         PageName:name,
         PageRouteId:routeId,
         PageType:ty,
         PageSample:{
          $:0
         }
        };
       }
      },
      SortableBarChart:{
       BarTransition:Runtime.Field(function()
       {
        return Trans.Enter(function(x)
        {
         return SortableBarChart.SimpleAnimation(0,x);
        },SortableBarChart.SimpleTransition());
       }),
       DelayedAnimation:function(delay,x,y)
       {
        return An.Delayed(Interpolation.get_Double(),Easing.get_CubicInOut(),300,delay,x,y);
       },
       Description:function()
       {
        return Html.Div0(List.ofArray([Utilities.txt("This sample show-cases animation and data display.")]));
       },
       DisplayGraph:function(data)
       {
        return Html.Div0(List.ofArray([SvgElements.Svg(List.ofArray([Utilities.op_EqualsEqualsGreater("width",Global.String(SortableBarChart.Width())),Utilities.op_EqualsEqualsGreater("height",Global.String(SortableBarChart.Height()))]),List.ofArray([Doc.EmbedView(View1.Map(function(arg00)
        {
         return Doc.Concat(arg00);
        },View1.ConvertSeqBy(function(d)
        {
         return d.Label;
        },function(dView)
        {
         return SortableBarChart.Render(dView);
        },data)))]))]));
       },
       Height:Runtime.Field(function()
       {
        return 500;
       }),
       LoadData:Runtime.Field(function()
       {
        return View1.MapAsync(function()
        {
         return SortableBarChart.LoadFromCSV("AlphaFrequency.csv");
        },View.Const(null));
       }),
       LoadFromCSV:function(url)
       {
        var callback;
        callback=Runtime.Tupled(function(tupledArg)
        {
         var ok;
         ok=tupledArg[0];
         jQuery.get(url,{},Runtime.Tupled(function(tupledArg1)
         {
          return ok(SortableBarChart.ParseCSV(tupledArg1[0]));
         }));
         return;
        });
        return Concurrency.FromContinuations(function(ok)
        {
         return function(no)
         {
          return callback([ok,no,function()
          {
          }]);
         };
        });
       },
       Main:function()
       {
        var vOrder,dataView;
        vOrder=Var1.Create({
         $:0
        });
        dataView=View1.Map2(function(xs)
        {
         return function(ordering)
         {
          return SortableBarChart.ViewData(xs,ordering);
         };
        },View1.Map(function(source)
        {
         return List.ofSeq(source);
        },SortableBarChart.LoadData()),vOrder.get_View());
        return Html.Div0(List.ofArray([Doc.Select(Runtime.New(T,{
         $:0
        }),function(_arg1)
        {
         return SortableBarChart.ShowOrdering(_arg1);
        },List.ofArray([{
         $:0
        },{
         $:1
        }]),vOrder),SortableBarChart.DisplayGraph(dataView)]));
       },
       ParseCSV:function(data)
       {
        return Arrays.map(function(str)
        {
         return SortableBarChart.mkEntry(Strings.SplitChars(str,[44],1));
        },OperatorIntrinsics.GetArraySlice(Arrays.filter(function(s)
        {
         return s!=="";
        },Strings.SplitChars(data,[13,10],1)),{
         $:1,
         $0:1
        },{
         $:0
        }));
       },
       Render:function(dView)
       {
        var dyn,width,height,x1,y,arg30;
        dyn=function(name,proj)
        {
         return Attr.Dynamic(name,View1.Map(function(x)
         {
          return Global.String(proj(x));
         },dView));
        };
        width=function(d)
        {
         return SortableBarChart.Width()/+d.NumData-SortableBarChart.Spacing();
        };
        height=function(d)
        {
         return d.Value/d.MaxValue*SortableBarChart.Height();
        };
        x1=function(d)
        {
         return(width(d)+SortableBarChart.Spacing())*+d.Rank;
        };
        y=function(d)
        {
         return SortableBarChart.Height()-height(d);
        };
        arg30=function(value)
        {
         return Global.String(value);
        };
        return SvgElements.G(List.ofArray([Attr.Style("fill","steelblue")]),List.ofArray([SvgElements.Rect(List.ofArray([dyn("width",width),dyn("height",height),Attr.Animated("x",SortableBarChart.BarTransition(),View1.Map(x1,dView),arg30),dyn("y",y)]),Runtime.New(T,{
         $:0
        }))]));
       },
       Sample:Runtime.Field(function()
       {
        return Samples.Build().Id("SortableBarChart").FileName("SortableBarChart.fs").Keywords(List.ofArray(["animation"])).Render(function()
        {
         return SortableBarChart.Main();
        }).RenderDescription(function()
        {
         return SortableBarChart.Description();
        }).Create();
       }),
       ShowOrdering:function(_arg1)
       {
        return _arg1.$==1?"By Frequency":"By Letter";
       },
       SimpleAnimation:function(x,y)
       {
        return SortableBarChart.DelayedAnimation(0,x,y);
       },
       SimpleTransition:Runtime.Field(function()
       {
        return Trans.Create(function(x)
        {
         return function(y)
         {
          return SortableBarChart.SimpleAnimation(x,y);
         };
        });
       }),
       Spacing:Runtime.Field(function()
       {
        return 2;
       }),
       ViewData:function(xs,ordering)
       {
        var numData,maxVal;
        numData=Seq.length(xs);
        maxVal=Seq.fold(function(max)
        {
         return function(x)
         {
          return x.DataValue>max?x.DataValue:max;
         };
        },0,xs);
        return List.mapi(function(i)
        {
         return function(x)
         {
          return{
           Label:x.DataLabel,
           Value:x.DataValue,
           Rank:i,
           MaxValue:maxVal,
           NumData:numData
          };
         };
        },List.sortWith(ordering.$==1?function(x)
        {
         return function(y)
         {
          return y.DataValue<x.DataValue?-1:x.DataValue===y.DataValue?0:1;
         };
        }:function(x)
        {
         return function(y)
         {
          return Unchecked.Compare(x.DataLabel,y.DataLabel);
         };
        },List.ofSeq(xs)));
       },
       Width:Runtime.Field(function()
       {
        return 720;
       }),
       mkEntry:function(row)
       {
        return{
         DataLabel:row[0],
         DataValue:parseFloat(row[1])
        };
       }
      },
      TodoList:{
       CreateModel:function()
       {
        return{
         Items:ListModel1.Create(function(item)
         {
          return item.Key;
         },Runtime.New(T,{
          $:0
         }))
        };
       },
       Description:function()
       {
        return Html.Div0(List.ofArray([Doc.TextNode("A to-do list application.")]));
       },
       Main:function()
       {
        return TodoList.TodoExample();
       },
       RenderItem:function(m,todo)
       {
        return Html.TR0(List.ofArray([Html.TD0(List.ofArray([Doc.EmbedView(View1.Map(function(isDone)
        {
         return isDone?Html.Del0(List.ofArray([Utilities.txt(todo.TodoText)])):Utilities.txt(todo.TodoText);
        },View1.FromVar(todo.Done)))])),Html.TD0(List.ofArray([Util.button("Done",function()
        {
         return Var.Set(todo.Done,true);
        })])),Html.TD0(List.ofArray([Util.button("Remove",function()
        {
         return m.Items.Remove(todo);
        })]))]));
       },
       Sample:Runtime.Field(function()
       {
        return Samples.Build().Id("TodoList").FileName("TodoList.fs").Keywords(List.ofArray(["todo"])).Render(function()
        {
         return TodoList.Main();
        }).RenderDescription(function()
        {
         return TodoList.Description();
        }).Create();
       }),
       TodoExample:function()
       {
        var m;
        m=TodoList.CreateModel();
        return Html.Table(List.ofArray([Utilities.op_EqualsEqualsGreater("class","table table-hover")]),List.ofArray([Html.TBody0(List.ofArray([TodoList.TodoList(m),TodoList.TodoForm(m)]))]));
       },
       TodoForm:function(m)
       {
        var rvInput;
        rvInput=Var1.Create("");
        return Html.Form0(List.ofArray([Utilities.divc("form-group",List.ofArray([Html.Label0(List.ofArray([Utilities.txt("New entry: ")])),Util.input(rvInput)])),Util.button("Submit",function()
        {
         return m.Items.Add(TodoItem.Create(Var1.Get(rvInput)));
        })]));
       },
       TodoItem:Runtime.Class({},{
        Create:function(s)
        {
         var Key1;
         Key1=Key.Fresh();
         return Runtime.New(TodoItem,{
          Done:Var1.Create(false),
          Key:Key1,
          TodoText:s
         });
        }
       }),
       TodoList:function(m)
       {
        return Doc.ConvertBy(function(m1)
        {
         return m1.Key;
        },function(todo)
        {
         return TodoList.RenderItem(m,todo);
        },ListModel1.View(m.Items));
       },
       Util:{
        button:function(name,handler)
        {
         return Doc.Button(name,List.ofArray([Utilities.op_EqualsEqualsGreater("class","btn btn-default")]),handler);
        },
        input:function(x)
        {
         return Doc.Input(List.ofArray([Utilities.op_EqualsEqualsGreater("class","form-control")]),x);
        }
       }
      },
      Utilities:{
       btn:function(caption,act)
       {
        return Doc.Button(caption,List.ofArray([Utilities.cls("btn"),Utilities.cls("btn-default")]),act);
       },
       cls:function(n)
       {
        return Attr.Class(n);
       },
       divc:function(c,docs)
       {
        return Doc.Element("div",List.ofArray([Utilities.cls(c)]),docs);
       },
       href:function(text,url)
       {
        return Doc.Element("a",List.ofArray([Utilities.op_EqualsEqualsGreater("href",url)]),List.ofArray([Utilities.txt(text)]));
       },
       link:function(cap,attr,act)
       {
        return Doc.Link(cap,attr,act);
       },
       op_EqualsEqualsGreater:function(k,v)
       {
        return Attr.Create(k,v);
       },
       sty:function(n,v)
       {
        return Attr.Style(n,v);
       },
       txt:function(t)
       {
        return Doc.TextNode(t);
       }
      }
     }
    }
   }
  }
 });
 Runtime.OnInit(function()
 {
  WebSharper=Runtime.Safe(Global.IntelliFactory.WebSharper);
  UI=Runtime.Safe(WebSharper.UI);
  Next=Runtime.Safe(UI.Next);
  Interpolation=Runtime.Safe(Next.Interpolation);
  Easing=Runtime.Safe(Next.Easing);
  AnimatedBobsleighSite=Runtime.Safe(Next.AnimatedBobsleighSite);
  An=Runtime.Safe(Next.An);
  Trans=Runtime.Safe(Next.Trans);
  Var=Runtime.Safe(Next.Var);
  Doc=Runtime.Safe(Next.Doc);
  List=Runtime.Safe(WebSharper.List);
  Html=Runtime.Safe(Next.Html);
  Utilities=Runtime.Safe(Next.Utilities);
  T=Runtime.Safe(List.T);
  Var1=Runtime.Safe(Next.Var1);
  View1=Runtime.Safe(Next.View1);
  Attr=Runtime.Safe(Next.Attr);
  View=Runtime.Safe(Next.View);
  Unchecked=Runtime.Safe(WebSharper.Unchecked);
  Samples=Runtime.Safe(Next.Samples);
  AnimatedContactFlow=Runtime.Safe(Next.AnimatedContactFlow);
  Flow=Runtime.Safe(Next.Flow);
  BobsleighSite=Runtime.Safe(Next.BobsleighSite);
  Calculator=Runtime.Safe(Next.Calculator);
  CheckBoxTest=Runtime.Safe(Next.CheckBoxTest);
  Seq=Runtime.Safe(WebSharper.Seq);
  Person=Runtime.Safe(CheckBoxTest.Person);
  Site=Runtime.Safe(Next.Site);
  SimpleTextBox=Runtime.Safe(Next.SimpleTextBox);
  InputTransform=Runtime.Safe(Next.InputTransform);
  TodoList=Runtime.Safe(Next.TodoList);
  PhoneExample=Runtime.Safe(Next.PhoneExample);
  EditablePersonList=Runtime.Safe(Next.EditablePersonList);
  ContactFlow=Runtime.Safe(Next.ContactFlow);
  MessageBoard=Runtime.Safe(Next.MessageBoard);
  RoutedBobsleighSite=Runtime.Safe(Next.RoutedBobsleighSite);
  ObjectConstancy=Runtime.Safe(Next.ObjectConstancy);
  MouseInfo=Runtime.Safe(Next.MouseInfo);
  KeyboardInfo=Runtime.Safe(Next.KeyboardInfo);
  Common=Runtime.Safe(Next.Common);
  Fresh=Runtime.Safe(Common.Fresh);
  String=Runtime.Safe(Global.String);
  Strings=Runtime.Safe(WebSharper.Strings);
  IntrinsicFunctionProxy=Runtime.Safe(WebSharper.IntrinsicFunctionProxy);
  Input=Runtime.Safe(Next.Input);
  Keyboard=Runtime.Safe(Input.Keyboard);
  Auth=Runtime.Safe(MessageBoard.Auth);
  Concurrency=Runtime.Safe(WebSharper.Concurrency);
  Server=Runtime.Safe(Next.Server);
  Mouse=Runtime.Safe(Input.Mouse);
  jQuery=Runtime.Safe(Global.jQuery);
  DataSet=Runtime.Safe(ObjectConstancy.DataSet);
  Arrays=Runtime.Safe(WebSharper.Arrays);
  OperatorIntrinsics=Runtime.Safe(WebSharper.OperatorIntrinsics);
  SvgElements=Runtime.Safe(Html.SvgElements);
  Math=Runtime.Safe(Global.Math);
  Phone=Runtime.Safe(PhoneExample.Phone);
  Operators=Runtime.Safe(WebSharper.Operators);
  Order=Runtime.Safe(PhoneExample.Order);
  RouteMap=Runtime.Safe(Next.RouteMap);
  Builder=Runtime.Safe(Samples.Builder);
  Router=Runtime.Safe(Next.Router);
  SiteCommon=Runtime.Safe(Next.SiteCommon);
  Elements=Runtime.Safe(Html.Elements);
  Option=Runtime.Safe(WebSharper.Option);
  Collections=Runtime.Safe(WebSharper.Collections);
  MapModule=Runtime.Safe(Collections.MapModule);
  FSharpMap=Runtime.Safe(Collections.FSharpMap);
  Router1=Runtime.Safe(Next.Router1);
  SortableBarChart=Runtime.Safe(Next.SortableBarChart);
  parseFloat=Runtime.Safe(Global.parseFloat);
  ListModel1=Runtime.Safe(Next.ListModel1);
  Util=Runtime.Safe(TodoList.Util);
  TodoItem=Runtime.Safe(TodoList.TodoItem);
  Key=Runtime.Safe(Next.Key);
  return Client=Runtime.Safe(Next.Client);
 });
 Runtime.OnLoad(function()
 {
  TodoList.Sample();
  SortableBarChart.Width();
  SortableBarChart.Spacing();
  SortableBarChart.SimpleTransition();
  SortableBarChart.Sample();
  SortableBarChart.LoadData();
  SortableBarChart.Height();
  SortableBarChart.BarTransition();
  Site.unitRouteMap();
  Site.homePage();
  Site.fadeTime();
  Site.aboutPage();
  Site.NavPages();
  Site.NavExternalLinks();
  Site.FadeTransition();
  Site.Fade();
  Site.Entries();
  SimpleTextBox.Sample();
  Server.threads();
  Server.posts();
  Server.DELAY();
  Samples.nav();
  RoutedBobsleighSite.TheRouteMap();
  RoutedBobsleighSite.Sample();
  PhoneExample.Sample();
  ObjectConstancy.Width();
  ObjectConstancy.SimpleTransition();
  ObjectConstancy.Sample();
  ObjectConstancy.InOutTransition();
  ObjectConstancy.Height();
  MouseInfo.Sample();
  MessageBoard.Sample();
  KeyboardInfo.keys();
  KeyboardInfo.Sample();
  InputTransform.Sample();
  EditablePersonList.peopleList();
  EditablePersonList.peopleBoxes();
  EditablePersonList.memberList();
  EditablePersonList.Sample();
  ContactFlow.personFlowlet();
  ContactFlow.contactTypeFlowlet();
  ContactFlow.Sample();
  Fresh.i();
  Client.Main();
  CheckBoxTest.Sample();
  CheckBoxTest.People();
  Calculator.initCalc();
  Calculator.Sample();
  BobsleighSite.pages();
  BobsleighSite.Sample();
  AnimatedContactFlow.swipeTime();
  AnimatedContactFlow.personFlowlet();
  AnimatedContactFlow.fadeTime();
  AnimatedContactFlow.contactTypeFlowlet();
  AnimatedContactFlow.SwipeTransition();
  AnimatedContactFlow.Swipe();
  AnimatedContactFlow.Sample();
  AnimatedContactFlow.FadeTransition();
  AnimatedContactFlow.Fade();
  AnimatedBobsleighSite.pages();
  AnimatedBobsleighSite.fadeTime();
  AnimatedBobsleighSite.Sample();
  AnimatedBobsleighSite.FadeTransition();
  AnimatedBobsleighSite.Fade();
  return;
 });
}());


if (typeof IntelliFactory !=='undefined')
  IntelliFactory.Runtime.Start();
