Voices = new Meteor.Collection('voices');
Tones = ['c','d','e','f','g','a','h','cc','dd','ee','ff','gg','aa','hh','ccc'];

if (Meteor.isClient) {
  Template.voicesList.helpers({
    ccc_voices: Voices.find({alt: 'ccc'}, ["serial", "asc"]),
    hh_voices: Voices.find({alt: 'hh'}, ["serial", "asc"]),
    aa_voices: Voices.find({alt: 'aa'}, ["serial", "asc"]),
    gg_voices: Voices.find({alt: 'gg'}, ["serial", "asc"]),
    ff_voices: Voices.find({alt: 'ff'}, ["serial", "asc"]),
    ee_voices: Voices.find({alt: 'ee'}, ["serial", "asc"]),
    dd_voices: Voices.find({alt: 'dd'}, ["serial", "asc"]),
    cc_voices: Voices.find({alt: 'cc'}, ["serial", "asc"]),
    h_voices: Voices.find({alt: 'h'}, ["serial", "asc"]),
    a_voices: Voices.find({alt: 'a'}, ["serial", "asc"]),
    g_voices: Voices.find({alt: 'g'}, ["serial", "asc"]),
    f_voices: Voices.find({alt: 'f'}, ["serial", "asc"]),
    e_voices: Voices.find({alt: 'e'}, ["serial", "asc"]),
    d_voices: Voices.find({alt: 'd'}, ["serial", "asc"]),
    c_voices: Voices.find({alt: 'c'}, ["serial", "asc"])
  });

  Template.voiceItem.events({
    'click td': function(e) {
      e.preventDefault();

      if (this.active == true){
        Voices.update({ _id: this._id } , { $set : { active: false }});
      }
      else
      {
        Voices.update({ _id: this._id } , { $set : { active: true }});
      }
    }
  });

  actual_tone = 0;

  soundManager.setup({
    url: '/swf/',
    flashVersion: 9,
    preferFlash: true,
    onready: function() {
      soundManager.createSound({
        id: 'cc', url: '/background2.mp3', autoLoad: true
      });
      soundManager.createSound({
        id: 'h', url: '/background1.mp3', autoLoad: true
      });
      soundManager.createSound({
        id: 'a', url: '/background0.mp3', autoLoad: true
      });
      soundManager.createSound({
        id: 'g', url: '/mouseover2.mp3', autoLoad: true
      });
      soundManager.createSound({
        id: 'f', url: '/mouseover.mp3', autoLoad: true
      });
      soundManager.createSound({
        id: 'e', url: '/button-1.mp3', autoLoad: true
      });
      soundManager.createSound({
        id: 'd', url: '/button-0.mp3', autoLoad: true
      });
      soundManager.createSound({
        id: 'c', url: '/bass.mp3', autoLoad: true
      });

      setTimeout(playSound, 200);
    }
  });

  function playSound(){
    setTimeout(playSound, 500);

    for(var i=0;i<8;i++){
      if ($($($("tr")[i]).children('td')[actual_tone]).hasClass('true'))
      {
        soundManager.play(Tones[i],{from: 0, to: 300, multiShotEvents: true });
      }
    }

    $('#main-tones td.actual').removeClass('actual');
    $($('#main-tones td')[actual_tone]).addClass('actual');
    actual_tone++;
    if (actual_tone == 8) actual_tone = 0;
  }
}

if (Meteor.isServer) {
  Meteor.startup(function () {

    if (Voices.find().count() === 0) {
      for(var i=0;i<8;i++){
        for(var e=0;e<8;e++){
          Voices.insert({
            alt: Tones[e],
            serial: i,
            active: false
          });
        }
      }
    }

  });
}
