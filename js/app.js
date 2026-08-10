"use strict";

const LINKS = {
  consultation: "https://forms.gle/6WyWa6VLV2VquWRT6"
};

// ロールプレイ用の架空情報です。
const ROLEPLAY_SCHOOL = {
  name: "Bloom Web School",
  instructor: "山田 美咲"
};

const PROVIDER = {
  name: "Sophia Labo"
};

const TOTAL_SCREENS = 20;
const state = {
  screen: 1,
  answers: {
    q1: null,
    q2: null,
    q3: null,
    prospectAction: null,
    reflection: null,
    school: null,
    action: null
  }
};

const screenEl = document.querySelector("#screen");
const backButton = document.querySelector("#back-button");
const progressWrap = document.querySelector("#progress-wrap");
const progressBar = document.querySelector("#progress-bar");
const progressTrack = document.querySelector(".progress-track");
const progressCount = document.querySelector("#progress-count");
const progressLabel = document.querySelector("#progress-label");
const roleChip = document.querySelector("#role-chip");

const q1Options = [
  { value: "beginner", label: "未経験の私でもついていける？" },
  { value: "order", label: "何から学べばいいか分からない" },
  { value: "balance", label: "仕事や生活と両立できる？" },
  { value: "practical", label: "学んでも実際に使えるようになる？" }
];

const q2Options = [
  { value: "create", label: "自分でWebページを作れるようになりたい" },
  { value: "share", label: "自分の商品や活動をWebで発信したい" },
  { value: "career", label: "仕事に活かせるスキルを増やしたい" },
  { value: "confidence", label: "まず「私にもできた」という実感がほしい" }
];

const q3Options = [
  { value: "path", label: "未経験からどう進めるのか" },
  { value: "content", label: "実際に何を学べるのか" },
  { value: "pace", label: "仕事や生活と両立できる学び方なのか" },
  { value: "support", label: "困ったとき、どんなサポートがあるのか" }
];

const prospectActionOptions = [
  { value: "gift", label: "プレゼントを見ながら、もう少し考えたい" },
  { value: "details", label: "スクールについてもう少し知りたい" },
  { value: "consult", label: "開催者に相談してみたい" },
  { value: "later", label: "今はまだ考えておきたい" }
];

const reflectionOptions = [
  { value: "reading", label: "スクールの説明を受け取っていた" },
  { value: "diagnosis", label: "自分に合うものを判断してもらっていた" },
  { value: "organizing", label: "自分の悩みや判断材料を整理していた" },
  { value: "pushed", label: "相談へ進むよう案内されていた" }
];

const schoolOptions = [
  { value: "fit", label: "自分に合うか分からない" },
  { value: "learning", label: "何を学べばいいか分からない" },
  { value: "courses", label: "コースの違いが分からない" },
  { value: "continuity", label: "続けられるか不安" },
  { value: "consult_questions", label: "相談で何を聞けばいいか分からない" },
  { value: "consult_need", label: "そもそも相談するほどか迷っている" }
];

const actionOptions = [
  { value: "self", label: "もう少し自分で考えたい" },
  { value: "reason", label: "LP型アプリを作っている理由を知りたい" },
  { value: "together", label: "一緒に具体化してみたい" }
];

function optionButtons(options, key, modifier = "") {
  return `<div class="options ${modifier}">${options.map((option) => `
    <button class="option ${state.answers[key] === option.value ? "is-selected" : ""}" type="button" data-answer="${key}" data-value="${option.value}">
      <span class="option__dot" aria-hidden="true">✓</span>
      <span>${option.label}</span>
    </button>`).join("")}</div>`;
}

function nextButton(label = "次へ進む", kind = "primary-button") {
  return `<button class="${kind}" type="button" data-action="next">${label}<span aria-hidden="true">→</span></button>`;
}

function card(content, classes = "") {
  return `<div class="screen-card ${classes}">${content}</div>`;
}

function answerLabel(options, key) {
  return options.find((option) => option.value === state.answers[key])?.label || "";
}

function q1Feedback() {
  const feedback = {
    beginner: {
      focus: "自分にも始められる進め方かどうか",
      body: "見込み客としてのあなたが確認したいのは、経験の有無だけではなく、“未経験の自分でも一歩ずつ始められるか”ということかもしれません。"
    },
    order: {
      focus: "自分に必要な学びの順番",
      body: "情報が足りないというより、“今の自分は何から始めればよいか”が見えていないことが、迷いにつながっているのかもしれません。"
    },
    balance: {
      focus: "生活の中で続けられる学び方",
      body: "見込み客としてのあなたが確認したいのは、「学べるか」だけではなく、“自分の生活の中で続けられる学び方か”ということかもしれません。"
    },
    practical: {
      focus: "学んだことを実際に使える未来",
      body: "知識を増やすことより、“学んだ先で自分にも何かを形にできるか”が、いちばん気になっているのかもしれません。"
    }
  };
  return feedback[state.answers.q1];
}

function q2Future() {
  const futures = {
    create: "自分の手でWebページを作り、アイデアを形にできる",
    share: "自分の商品や活動を、自分の言葉とWebで伝えられる",
    career: "身につけたWebスキルを、今の仕事やこれからの働き方に活かせる",
    confidence: "小さな制作を完成させて、「私にもできた」と実感できる"
  };
  return futures[state.answers.q2];
}

function q3Information() {
  const information = {
    path: {
      title: "未経験からの進み方",
      summary: "“未経験の自分にも始められる順番かどうか”を確認すると判断しやすそうです。",
      body: "最初はWebの基本と小さな制作から始め、操作に慣れたあとで実践課題へ進みます。知識を一度に詰め込まず、基礎→練習→制作の順で積み上げます。"
    },
    content: {
      title: "実際に学べる内容",
      summary: "“目指す未来に必要な内容を学べるか”を確認すると判断しやすそうです。",
      body: "Webページ制作の基礎、見やすく伝えるためのデザイン、自分の商品や活動を届ける発信の考え方を、制作しながら学びます。"
    },
    pace: {
      title: "生活に合わせた学び方",
      summary: "“自分にも続けられる学び方かどうか”を確認すると判断しやすそうです。",
      body: "オンラインで、自分のペースを基本に進めます。現在地や生活に合わせて学習量を調整し、無理なく続けられる進め方を考えます。"
    },
    support: {
      title: "困ったときのサポート",
      summary: "“一人で止まらずに進めるか”を確認すると判断しやすそうです。",
      body: "制作中に困ったことを質問し、次に確認するポイントを整理できます。答えだけを渡すのではなく、自分で進めるための考え方も一緒に確認します。"
    }
  };
  return information[state.answers.q3];
}

function schoolSuggestion() {
  const suggestions = {
    fit: {
      title: "「自分に合う条件」を言葉にする体験",
      items: ["学ぶ目的", "今の経験", "使える時間", "気になっている不安"],
      result: "自分の目的や状況に合うスクールかどうか"
    },
    learning: {
      title: "「何を学ぶか」を未来から整理する体験",
      items: ["目指したい未来", "今できること", "困っていること", "身につけたいこと"],
      result: "今の自分に必要な学びの順番"
    },
    courses: {
      title: "「コースの違い」を目的から見比べる体験",
      items: ["達成したいこと", "必要な学習範囲", "学べる期間", "希望するサポート"],
      result: "どの違いを比べると判断しやすいか"
    },
    continuity: {
      title: "「続けられる条件」を具体化する体験",
      items: ["生活スタイル", "学習に使える時間", "今の不安", "目指したい未来"],
      result: "自分にも続けられる学び方かどうか"
    },
    consult_questions: {
      title: "相談前に「聞きたいこと」を準備する体験",
      items: ["分かっていること", "まだ不明なこと", "気になる不安", "相談で確かめたいこと"],
      result: "相談で何を確認するとよいか"
    },
    consult_need: {
      title: "「相談が必要か」を自分で見極める体験",
      items: ["今の迷い", "足りない情報", "自分で確認できること", "人に聞きたいこと"],
      result: "情報を見るか、相談するか、今は待つか"
    }
  };
  return suggestions[state.answers.school];
}

function renderProspectActionResult() {
  if (!state.answers.prospectAction) return "";
  const results = {
    gift: {
      title: "自分のペースで考えてみましょう。",
      body: "ロードマップを見ながら、今の自分がどこから始めたいかをゆっくり確認できます。",
      link: ""
    },
    details: {
      title: "もう少し情報を確認できます。",
      body: "実際の導入では、ここからスクールの詳しい内容や学び方を確認できるページへつなぎます。",
      link: ""
    },
    consult: {
      title: "相談で確認したいことが見えてきました。",
      body: "実際の導入では、ここから開催者の相談案内や申込みページへつなぎます。",
      link: ""
    },
    later: {
      title: "今は決めなくて大丈夫です。",
      body: "気になったことだけ覚えておいて、必要になったときにまた考えてください。",
      link: ""
    }
  };
  const result = results[state.answers.prospectAction];
  return `<div class="action-result"><h3>${result.title}</h3><p>${result.body}</p>${result.link}</div>${nextButton("見込み客編を終える")}`;
}

function renderFinalActionResult() {
  if (!state.answers.action) return "";
  const results = {
    self: `<div class="action-result"><h3>まずは、小さく整理してみましょう。</h3><p>見込み客からよく聞かれる質問を3つ書き出し、その前にどんな迷いがあるかを考えてみてください。</p></div>`,
    reason: `<div class="action-result action-result--story">
      <h3>なぜ、LP型アプリを作っているのか</h3>
      <div class="reason-story">
        <p>私自身、以前、不安や「今決めなければ」という空気の中で、<br>苦しくなって契約してしまった経験があります。</p>
        <p>後から振り返ると、<br>自分で納得して選んだというより、<br>逃げるように決めてしまった感覚が残っていました。</p>
        <p>だから私は、<br>見込み客を不安や恐怖で動かすのではなく、</p>
        <p class="reason-story__statement">「自分の気持ちを整理し、<br>自分の未来を考え、<br>自分の意思で次を選べる体験」</p>
        <p>を作りたいと思っています。</p>
        <p>相談するという決断も、<br>今は相談しないという決断も、</p>
        <p>その人自身が納得して選べたなら、<br>それも一つの成功です。</p>
        <p>LP型アプリは、</p>
        <p class="reason-story__statement">「期待と決断のあいだにある<br>“自分の場合”を整理するための仕組み。」</p>
        <p>見込み客が、<br>自分の未来に少しワクワクしながら、</p>
        <p class="reason-story__statement">「本当に自分にとって必要な未来」</p>
        <p>をつかんでいけるように。</p>
        <p>そして提供する側も、<br>その未来を一緒に考えられるように。</p>
        <p>そんな相談前の体験を、<br>Sophia Laboは作っていきたいと考えています。</p>
      </div>
      <p class="reason-story__thanks">ここまで読んでいただき、ありがとうございます。<br>必要になったときに、このLP型アプリのことを<br>思い出してもらえたらうれしいです。</p>
    </div>`,
    together: `<div class="action-result"><h3>相談前体験を、一緒に整理します。</h3><p>誰が、どこで迷い、何が分かると判断しやすいか。あなたのスクールの場合を具体化します。</p><a class="primary-button" href="${LINKS.consultation}">あなたのスクールでの相談前体験を一緒に整理する <span aria-hidden="true">→</span></a></div>`
  };
  return results[state.answers.action];
}

function renderScreen() {
  const screens = {
    1: () => card(`
      <div class="hero-layout">
        <img class="visual visual--hero" src="images/hero.png" alt="LP型アプリを体験するスクール運営者のイメージ">
        <div>
          <p class="eyebrow">オンラインスクール運営者・講師の方へ</p>
          <h1>LP型アプリで、<br>相談前をデザインする。</h1>
          <p class="lead">見込み客の「迷い」を整理し、<br><strong>必要な人だけが自然に相談へ進む。</strong></p>
          <p class="lead">説明を読むだけではなく、実際に見込み客役を体験しながら仕組みを確認できます。</p>
          ${nextButton("見込み客の体験をしてみる")}
          <p class="microcopy">この体験内の回答は送信・保存されません。</p>
        </div>
      </div>
    `),
    2: () => card(`
      <div class="center">
        <div class="return-mark role-shift-mark" aria-hidden="true">→</div>
        <p class="eyebrow">視点を切り替える</p>
        <h2>ここから少しだけ、<br>見込み客として体験してみてください。</h2>
        <p class="lead">あなたは今、Webスキルを少し身につけてみたいと思っています。</p>
        <p class="lead">オンラインスクールが少し気になっていますが、まだ受講や相談を決めているわけではありません。</p>
        <div class="callout">この先は、「見込み客としてのあなた」の気持ちで進んでみてください。</div>
        ${nextButton("見込み客として進む")}
      </div>
    `),
    3: () => card(`
      <div class="school-demo__brand"><span class="school-demo__mark" aria-hidden="true">B</span><div><strong>${ROLEPLAY_SCHOOL.name}</strong><small>ONLINE SCHOOL</small></div></div>
      <p class="eyebrow">少し気になる、から始まる</p>
      <h2>Webスキルを身につけて、<br>“自分でできること”を増やしてみませんか？</h2>
      <p class="lead">未経験から、Web制作や発信に必要なスキルを学ぶオンラインスクールです。</p>
      <div class="gift-banner"><span aria-hidden="true">🎁</span><div><small>今なら</small><strong>「はじめてのWebスキル学習ロードマップ」プレゼント付き</strong></div></div>
      <p class="microcopy">※これは体験用の架空スクールです。</p>
      ${nextButton("もう少し見てみる", "secondary-button")}
    `),
    4: () => card(`
      <p class="eyebrow">興味を持った、その次に</p>
      <h2>興味はある。<br>でも、ちょっと迷う。</h2>
      <img class="visual visual--compact" src="images/confused.png" alt="興味はあるものの自分の場合を判断できず迷っている見込み客">
      <div class="voice-list" aria-label="見込み客の心の声"><span>「未経験の私でもできる？」</span><span>「何から学べばいい？」</span><span>「仕事と両立できる？」</span><span>「本当に使えるようになる？」</span></div>
      <p class="lead">スクールを選ぶ前に、<strong>“自分の場合はどうなんだろう”</strong>が気になりますよね。</p>
      ${nextButton("少し整理してみる")}
    `),
    5: () => card(`
      <p class="eyebrow"><span class="screen-number">QUESTION 1 / 3</span></p>
      <h2>見込み客としてのあなたが、<br>今いちばん気になっているのは？</h2>
      <p class="question-note">心の声に一番近いものを選んでください。</p>
      ${optionButtons(q1Options, "q1")}
    `),
    6: () => {
      const feedback = q1Feedback();
      return card(`
        <p class="eyebrow">答えて、ひとつ気づく</p>
        <h2>気になっていることが、<br>ひとつ見えてきました。</h2>
        <img class="visual visual--compact" src="images/realization.png" alt="自分が気になっていることに気づき始めた見込み客">
        <div class="previous-answer"><span>選んだ心の声</span>「${answerLabel(q1Options, "q1")}」</div>
        <p class="lead">${feedback.body}</p>
        <div class="callout"><span class="insight__label">今、見えてきたこと</span><strong>「${feedback.focus}」が気になっている</strong></div>
        <p class="question-note">では、その不安が少し減ったとしたら――</p>
        ${nextButton("次へ")}
      `);
    },
    7: () => card(`
      <p class="eyebrow"><span class="screen-number">QUESTION 2 / 3</span></p>
      <div class="previous-answer"><span>今、気になっていること</span>${q1Feedback().focus}</div>
      <h2>できるようになったら、<br>どんな変化がいちばんうれしいですか？</h2>
      ${optionButtons(q2Options, "q2")}
    `),
    8: () => card(`
      <p class="eyebrow">欲しい未来を言葉にする</p>
      <h2>“Webを勉強する”ことが<br>目的ではないんですね。</h2>
      <img class="visual visual--compact" src="images/future.png" alt="Webスキルを学んだ先の未来が見え始めた見込み客">
      <div class="future-statement"><span>あなたが描いた未来</span><strong>${q2Future()}</strong></div>
      <p class="lead">今はまだ「できるかな？」でも、少しずつできることが増えたら、<strong>「私にもできるかも」</strong>に変わっていくかもしれません。</p>
      ${nextButton("その未来に必要な情報を考える")}
    `),
    9: () => card(`
      <p class="eyebrow"><span class="screen-number">QUESTION 3 / 3</span></p>
      <div class="previous-answer"><span>目指したい未来</span>${q2Future()}</div>
      <h2>では、その未来へ進む前に。</h2>
      <p class="lead">見込み客としてのあなたは、何がもう少し分かると判断しやすそうですか？</p>
      ${optionButtons(q3Options, "q3")}
    `),
    10: () => {
      const information = q3Information();
      return card(`
        <p class="eyebrow">答えに合わせて、必要な情報を見る</p>
        <h2>今のあなたが確認すると<br>よさそうなのは――</h2>
        <img class="visual visual--compact" src="images/organized.png" alt="悩みと未来と判断材料が整理された見込み客">
        <div class="answer-story">
          <div class="answer-story__item"><span class="answer-story__number">1</span><div><span class="insight__label">今気になっていたこと</span><p>${answerLabel(q1Options, "q1")}</p></div></div>
          <div class="answer-story__item"><span class="answer-story__number">2</span><div><span class="insight__label">目指したい未来</span><p>${answerLabel(q2Options, "q2")}</p></div></div>
          <div class="answer-story__item"><span class="answer-story__number">3</span><div><span class="insight__label">判断するために知りたいこと</span><p>${answerLabel(q3Options, "q3")}</p></div></div>
        </div>
        <div class="callout result-summary"><span>つまり今は</span><strong>${information.summary}</strong></div>
        <section class="school-info-panel"><span class="insight__label">${ROLEPLAY_SCHOOL.name}の基本情報</span><h3>${information.title}</h3><p>${information.body}</p></section>
        <p class="microcopy">これは講座や性格の診断ではなく、今の判断に必要な情報を整理したものです。</p>
        ${nextButton("学んだ先の未来を見てみる")}
      `);
    },
    11: () => card(`
      <p class="eyebrow">学ぶことの、その先へ</p>
      <h2>目指すのは、<br>“講座を受けること”ではありません。</h2>
      <ul class="benefit-list"><li>自分でWebページを作れる。</li><li>自分の商品や活動を発信できる。</li><li>「次はこれをやってみよう」と、自分で一歩進める。</li></ul>
      <div class="future-statement"><span>受講後に目指す状態</span><strong>学ぶ前より、“自分でできること”が増えている。</strong></div>
      <p class="lead">${ROLEPLAY_SCHOOL.name}は、そんな未来へ進むためのスクールです。</p>
      ${nextButton("このスクールについて、もう少し見る")}
    `),
    12: () => card(`
      <p class="eyebrow">見込み客編・最後の選択</p>
      <h2>このスクールを<br>開催している人</h2>
      <img class="visual visual--compact visual--story" src="images/choice.png" alt="情報を確認し自分で次の行動を選べる状態になった見込み客">
      <section class="instructor-card" aria-label="開催者プロフィール"><span class="instructor-card__avatar" aria-hidden="true">美</span><div><span class="insight__label">開催者</span><h3>${ROLEPLAY_SCHOOL.instructor}（架空）</h3><p>未経験からWebスキルを学ぶ方が、「分からないまま進む」のではなく、一つずつ自分でできることを増やしていく学びを大切にしています。</p></div></section>
      <div class="gift-banner"><span aria-hidden="true">🎁</span><div><small>体験用プレゼント</small><strong>「はじめてのWebスキル学習ロードマップ」プレゼント付き</strong></div></div>
      <p class="fiction-note">※架空スクール・架空人物によるロールプレイです。</p>
      <h3 class="choice-heading">見込み客としてのあなたは、<br>ここからどうしたいですか？</h3>
      ${optionButtons(prospectActionOptions, "prospectAction")}
      <div id="prospect-action-result">${renderProspectActionResult()}</div>
    `),
    13: () => card(`
      <div class="center"><div class="return-mark" aria-hidden="true">↺</div><p class="eyebrow">見込み客編終了</p><h2>ここまでが、<br>見込み客としての体験です。</h2><p class="lead">ここからは、スクール運営者として振り返ってみてください。</p>${nextButton("運営者として振り返る")}</div>
    `),
    14: () => card(`
      <p class="eyebrow">体験を外側から見る</p>
      <h2>この体験で、<br>自分がしていたことに近いのはどれですか？</h2>
      <p class="question-note">正解を選ぶ質問ではありません。<br>近い感覚を選んでください。</p>
      ${optionButtons(reflectionOptions, "reflection")}
    `),
    15: () => card(`
      <p class="eyebrow">ここで種明かしです</p>
      <h2>この体験で大切にしていたのは、<br>“自分で次の行動を選べること”です。</h2>
      <p class="lead">見込み客役のあなたは、<br>不安や希望を整理し、必要な情報を見ながら、<br>最後にどうするかを自分で選びました。<br><br>『相談する』だけでなく、<br>『今は相談しない』という選択も含めてです。</p>
      <div class="journey-grid" aria-label="体験した心理変化">
        <figure><img src="images/confused.png" alt=""><figcaption>迷い</figcaption></figure>
        <figure><img src="images/realization.png" alt=""><figcaption>気づき</figcaption></figure>
        <figure><img src="images/future.png" alt=""><figcaption>未来</figcaption></figure>
        <figure><img src="images/organized.png" alt=""><figcaption>整理</figcaption></figure>
        <figure><img src="images/choice.png" alt=""><figcaption>選択</figcaption></figure>
      </div>
      <div class="callout"><strong>これが、LP型アプリでつくる“相談前の体験”です。</strong></div>
      ${nextButton("普通のLPとの違いを見る")}
    `),
    16: () => card(`
      <p class="eyebrow">説明に、本人の参加を加える</p>
      <h2>普通のLPとの違いは、<br>“自分の場合”を考えながら進めることです。</h2>
      <div class="comparison">
        <section class="comparison-card"><h3>通常LP</h3><ul class="compare-list"><li>悩みを想定して説明する</li><li>ベネフィットを見せる</li><li>信頼を作る</li><li>CTAへ案内する</li></ul></section>
        <section class="comparison-card comparison-card--app"><h3>LP型アプリ</h3><ul class="compare-list"><li>悩みを本人に選んでもらう</li><li>欲しい未来を本人に考えてもらう</li><li>必要な情報を出し分ける</li><li>次の行動も本人が選ぶ</li></ul></section>
      </div>
      <div class="callout callout--beige">LPを置き換えるのではなく、<strong>“自分の場合は？”を整理する役割</strong>です。</div>
      ${nextButton("質問の役割を見る")}
    `),
    17: () => card(`
      <p class="eyebrow">アンケートとの違い</p>
      <h2>質問は、<br>情報を集めるためだけではありません。</h2>
      <div class="comparison"><section class="comparison-card"><h3>一般的なアンケート</h3><p>スクール側が、見込み客を知るための質問。</p></section><section class="comparison-card comparison-card--app"><h3>LP型アプリ</h3><p>見込み客本人も、自分のことを整理するための質問。</p></section></div>
      <div class="callout">理想は、見込み客にも価値があり、スクール側にも相談前の情報が残ること。</div>
      ${nextButton("自分のスクールで考える")}
    `),
    18: () => card(`
      <p class="eyebrow">あなたのスクールなら？</p>
      <h2>では、スクール運営者として<br>考えてみてください。</h2>
      <p class="lead">あなたのスクールでは、見込み客が相談前にどこで止まっていそうですか？</p>
      ${optionButtons(schoolOptions, "school", "options--six")}
    `),
    19: () => {
      const suggestion = schoolSuggestion();
      return card(`
        <p class="eyebrow">運営者自身の状況を整理する</p>
        <h2>あなたのスクールでは、<br>こんな“相談前体験”を作れるかもしれません。</h2>
        <div class="callout"><strong>${suggestion.title}</strong></div>
        <p class="lead">見込み客自身に、次のことを短く整理してもらいます。</p>
        <ul class="organize-list">${suggestion.items.map((item) => `<li>${item}</li>`).join("")}</ul>
        <div class="future-statement"><span>本人へ返すもの</span><strong>「${suggestion.result}」を確認できる情報</strong></div>
        <div class="not-always"><strong>LP型アプリが必ず必要とは限りません。</strong><br>商品が一つで説明が簡単な場合や、質問しても見せる情報がほとんど変わらない場合は、通常LPやフォームだけの方が適していることもあります。</div>
        ${nextButton("今の段階を選ぶ")}
      `);
    },
    20: () => card(`
      <p class="eyebrow">最後に、自分で選ぶ</p>
      <h2>今の段階では、<br>どれが近いですか？</h2>
      <p class="question-note">どの選択も自然です。相談が必要な場合だけ選んでください。</p>
      ${optionButtons(actionOptions, "action")}
      <div id="action-result">${renderFinalActionResult()}</div>
      ${state.answers.action ? `<button class="back-button" type="button" data-action="restart"><span aria-hidden="true">↺</span> 最初から体験する</button>` : ""}
      <footer class="provider-note"><span>このLP型アプリの企画・制作</span><strong>企画・制作：${PROVIDER.name}</strong><p>見込み客の「自分の場合」を整理する<br>LP型アプリ・相談前体験の企画／制作</p><p class="copyright">© 2026 Sophia Labo. All Rights Reserved.</p></footer>
    `)
  };

  screenEl.innerHTML = screens[state.screen]();
  updateChrome();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function updateChrome() {
  backButton.hidden = state.screen === 1;
  progressWrap.hidden = state.screen === 1;
  progressLabel.textContent = state.screen <= 12 ? "見込み客編" : "スクール運営者編";
  progressCount.textContent = state.screen <= 12 ? "体験中" : "振り返り中";
  progressBar.style.width = `${(state.screen / TOTAL_SCREENS) * 100}%`;
  progressTrack.setAttribute("aria-valuenow", String(state.screen));
  roleChip.textContent = state.screen >= 2 && state.screen <= 12 ? "見込み客として" : "スクール運営者として";
}

function canAdvance() {
  const required = { 5: "q1", 7: "q2", 9: "q3", 12: "prospectAction", 14: "reflection", 18: "school" };
  return !required[state.screen] || Boolean(state.answers[required[state.screen]]);
}

function goNext() {
  if (!canAdvance() || state.screen >= TOTAL_SCREENS) return;
  state.screen += 1;
  renderScreen();
}

function selectAnswer(key, value) {
  state.answers[key] = value;
  if (key === "prospectAction" || key === "action") {
    renderScreen();
    document.querySelector(key === "prospectAction" ? "#prospect-action-result" : "#action-result")?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    return;
  }
  window.setTimeout(goNext, 170);
}

function restart() {
  state.screen = 1;
  Object.keys(state.answers).forEach((key) => { state.answers[key] = null; });
  renderScreen();
}

document.addEventListener("click", (event) => {
  const answer = event.target.closest("[data-answer]");
  if (answer) {
    selectAnswer(answer.dataset.answer, answer.dataset.value);
    return;
  }
  const action = event.target.closest("[data-action]");
  if (!action) return;
  if (action.dataset.action === "next") goNext();
  if (action.dataset.action === "back" && state.screen > 1) { state.screen -= 1; renderScreen(); }
  if (action.dataset.action === "restart") { event.preventDefault(); restart(); }
});

renderScreen();
