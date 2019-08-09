import Calculator from '../Component/calculaterComponent';

// 100 を基にする
let calculator = new Calculator(100);

// 130 加算
calculator.add(130);
// 20 減算
calculator.sub(20);
// 4 乗算
calculator.mul(4);
// 2 除算
calculator.div(2);

// 操作を１つキャンセル（除算取り消し）
calculator.cancel();

// 結果出力
console.log(
    '計算結果：' + calculator.getValue()
);

// 演算リセット
calculator.reset();

// 結果出力
console.log(
    'リセット結果：' + calculator.getValue()
);