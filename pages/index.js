import Head from 'next/head'
import styles from '../styles/Home.module.css'

import { useEffect } from 'react';

export default function Home() {

  useEffect(() => {
    document.getElementsByTagName("head")[0].insertAdjacentHTML(
    "beforeend",
    "<link rel=\"stylesheet\" href=\"/pages/assets/main.css\" /> <link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">"
  )}, [])
  
  return (
    <div className="content" dangerouslySetInnerHTML={{__html: htmlPage}}></div>
  )
}


const htmlPage = 
`
    <div id="wrapper">
      <div id="main">
        <div class="inner">
          <div id="container02" class="style6 container default full screen">
            <div class="wrapper">
              <div class="inner" data-onvisible-trigger="1">
                <h3 id="text27" class="style1">Desci community</h3>
                <h1 id="text07" class="style3">Gratitude</h1>
                <p id="text15" class="style4">Expressing thanks is an important cultural practice to recognize and celebrate community members that have stepped up for everyone's benefit.</p>
                <ul id="buttons05" class="style3 buttons">
                  <li>
                    <a href="https://gratitude.desci.community/claim" class="button n01"><svg><use xlink:href="/pages/assets/icons.svg#arrow-right-light"></use></svg><span class="label">WAGMI</span></a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div id="container06" data-scroll-id="start" data-scroll-behavior="center" data-scroll-offset="0" data-scroll-invisible="1" class="style1 container default">
            <div class="wrapper">
              <div class="inner" data-onvisible-trigger="1">
                <h3 id="text08" class="style1">Decentralized science</h3>
                <h2 id="text28" class="style5">community first</h2>
                <p id="text29" class="style4">DeSci is a public good and depends on selfless action and contribution to realize the benefits of shared knowledge.</p>
              </div>
            </div>
          </div>
          <ul id="buttons01" class="style3 buttons">
            <li>
              <a href="https://desci.community" class="button n01"><svg><use xlink:href="/pages/assets/icons.svg#link"></use></svg><span class="label">Home</span></a>
            </li>
          </ul>
          <hr id="divider04" class="style1 full screen">
          <div id="container03" class="style6 container default full screen">
            <div class="wrapper">
              <div class="inner" data-onvisible-trigger="1">
                <h2 id="text01" class="style5">Tulips of Appreciation</h2>
              </div>
            </div>
          </div>
          <div id="container10" class="style5 container columns">
            <div class="wrapper">
              <div class="inner" data-onvisible-trigger="1" data-reorder="1,0">
                <div>
                  <p id="text20" class="style4"><em>&quot;Thank you so much for making it happen! It&#39;s been extremely inspiring to meet so many like-minded individuals in the atmosphere of mutual interest and support rather than competition. I&#39;m sure a lot of seeds for future collaborations were planted at DeSci Day in Amsterdam. The level of organisation was unbelievable! Getting a lunch box while keeping an interesting conversation rolling was an amazing bonus =) Big hugs, and I&#39;m very much looking forward to seeing you guys again!&quot;</em></p>
                </div>
                <div>
                  <div id="image06" class="style2 image">
                    <a href="ipfs://bafkreigvcb3ks3i6b2wtvkfoljh3vhgvulkj7abjke5vfuv447r5gftrfm" class="frame"><img src="/pages/assets/images/image06.png" alt="" /></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr id="divider02" class="style2">
          <div id="container11" class="style5 container columns">
            <div class="wrapper">
              <div class="inner" data-onvisible-trigger="1" data-reorder="0,1">
                <div>
                  <div id="image05" class="style2 image">
                    <a href="ipfs://bafkreidsqwpzvy4sca5rtvxxegz3bmk4ivdjjra2ziay2pcv634ggl3uai" class="frame"><img src="/pages/assets/images/image05.png" alt="" /></a>
                  </div>
                </div>
                <div>
                  <p id="text12" class="style4"><em>&quot;Thank you for your leadership in the DeSci community. Many of us are dreamers, only some can execute. It is a privilege to get to learn from your operations ability.&quot;</em></p>
                </div>
              </div>
            </div>
          </div>
          <ul id="icons04" class="style1 icons">
            <li>
              <a class="n01" href="https://twitter.com/descieth">
                <svg><use xlink:href="/pages/assets/icons.svg#twitter"></use></svg>
                <span class="label">Twitter</span>
              </a>
            </li><li>
              <a class="n02" href="mailto:support@desci.community">
                <svg><use xlink:href="/pages/assets/icons.svg#email-alt"></use></svg>
                <span class="label">Email (Alt)</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>`
