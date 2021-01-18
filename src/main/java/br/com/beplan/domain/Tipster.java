package br.com.beplan.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.Instant;

/**
 * A Tipster.
 */
@Entity
@Table(name = "tipster")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Tipster implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome")
    private String nome;

    @Column(name = "desempenho", precision = 21, scale = 2)
    private BigDecimal desempenho;

    @Column(name = "desempenho_mes", precision = 21, scale = 2)
    private BigDecimal desempenhoMes;

    @Column(name = "desempenho_ano", precision = 21, scale = 2)
    private BigDecimal desempenhoAno;

    @Column(name = "desempenho_total", precision = 21, scale = 2)
    private BigDecimal desempenhoTotal;

    @Column(name = "esporte")
    private String esporte;

    @Column(name = "horarios")
    private String horarios;

    @Column(name = "nr_tips_dia")
    private Long nrTipsDia;

    @Column(name = "data")
    private Instant data;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public Tipster nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public BigDecimal getDesempenho() {
        return desempenho;
    }

    public Tipster desempenho(BigDecimal desempenho) {
        this.desempenho = desempenho;
        return this;
    }

    public void setDesempenho(BigDecimal desempenho) {
        this.desempenho = desempenho;
    }

    public BigDecimal getDesempenhoMes() {
        return desempenhoMes;
    }

    public Tipster desempenhoMes(BigDecimal desempenhoMes) {
        this.desempenhoMes = desempenhoMes;
        return this;
    }

    public void setDesempenhoMes(BigDecimal desempenhoMes) {
        this.desempenhoMes = desempenhoMes;
    }

    public BigDecimal getDesempenhoAno() {
        return desempenhoAno;
    }

    public Tipster desempenhoAno(BigDecimal desempenhoAno) {
        this.desempenhoAno = desempenhoAno;
        return this;
    }

    public void setDesempenhoAno(BigDecimal desempenhoAno) {
        this.desempenhoAno = desempenhoAno;
    }

    public BigDecimal getDesempenhoTotal() {
        return desempenhoTotal;
    }

    public Tipster desempenhoTotal(BigDecimal desempenhoTotal) {
        this.desempenhoTotal = desempenhoTotal;
        return this;
    }

    public void setDesempenhoTotal(BigDecimal desempenhoTotal) {
        this.desempenhoTotal = desempenhoTotal;
    }

    public String getEsporte() {
        return esporte;
    }

    public Tipster esporte(String esporte) {
        this.esporte = esporte;
        return this;
    }

    public void setEsporte(String esporte) {
        this.esporte = esporte;
    }

    public String getHorarios() {
        return horarios;
    }

    public Tipster horarios(String horarios) {
        this.horarios = horarios;
        return this;
    }

    public void setHorarios(String horarios) {
        this.horarios = horarios;
    }

    public Long getNrTipsDia() {
        return nrTipsDia;
    }

    public Tipster nrTipsDia(Long nrTipsDia) {
        this.nrTipsDia = nrTipsDia;
        return this;
    }

    public void setNrTipsDia(Long nrTipsDia) {
        this.nrTipsDia = nrTipsDia;
    }

    public Instant getData() {
        return data;
    }

    public Tipster data(Instant data) {
        this.data = data;
        return this;
    }

    public void setData(Instant data) {
        this.data = data;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Tipster)) {
            return false;
        }
        return id != null && id.equals(((Tipster) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Tipster{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", desempenho=" + getDesempenho() +
            ", desempenhoMes=" + getDesempenhoMes() +
            ", desempenhoAno=" + getDesempenhoAno() +
            ", desempenhoTotal=" + getDesempenhoTotal() +
            ", esporte='" + getEsporte() + "'" +
            ", horarios='" + getHorarios() + "'" +
            ", nrTipsDia=" + getNrTipsDia() +
            ", data='" + getData() + "'" +
            "}";
    }
}
